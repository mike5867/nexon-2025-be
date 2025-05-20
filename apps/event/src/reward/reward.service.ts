import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'apps/auth/src/user/user.repository';
import { User } from 'apps/auth/src/user/user.schema';
import { UserLoginHistoryRepository } from 'apps/auth/src/user/userLoginHistory.repository';
import dayjs from 'dayjs';
import {
  convertEventDocumentToDto,
  convertEventRewardClaimDocumentToDto,
} from 'lib/convertor/event.convertor';
import { EventConditionType, EventDto } from 'lib/dto/event.dto';
import { EventReward, EventRewardClaimDto } from 'lib/dto/reward.dto';
import { EventRepository } from '../event.repository';
import { Event } from '../event.schema';
import { EventRewardClaimRepository } from './reward.repository';

@Injectable()
export class RewardService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly eventRewardClaimRepository: EventRewardClaimRepository,
    private readonly userRepository: UserRepository,
    private readonly userLoginHistoryRepository: UserLoginHistoryRepository,
  ) {}

  async addEventReword(
    eventId: string,
    reward: EventReward,
  ): Promise<EventDto> {
    const event = await this.eventRepository.findOne({ _id: eventId });

    if (!event) {
      throw new NotFoundException(`Event(${eventId}) not found`);
    }

    event.rewards.push(reward);

    const updatedEvent = await this.eventRepository.update(event._id, {
      rewards: event.rewards,
    });

    return convertEventDocumentToDto(updatedEvent);
  }

  async claimEventReward(
    eventId: string,
    userId: string,
  ): Promise<EventRewardClaimDto> {
    const event = await this.eventRepository.findOne({ _id: eventId });

    if (!event) {
      throw new NotFoundException(`Event(${eventId}) not found`);
    }

    const user = await this.userRepository.findOne({ _id: userId });

    if (!user) {
      throw new NotFoundException(`User(${userId}) not found`);
    }

    const isValid = await this.validateEventConditionMatched(event, user);

    if (!isValid) {
      throw new BadRequestException(
        `Event Reward Condition Not Matched. Event(${event.description})`,
      );
    }

    const claim = await this.eventRewardClaimRepository.create({
      userId: user._id,
      eventId: event._id,
    });

    return convertEventRewardClaimDocumentToDto(claim);
  }

  async getEventRewardClaims(where: {
    userId?: string;
  }): Promise<Array<EventRewardClaimDto>> {
    const claims = await this.eventRewardClaimRepository.find({
      userId: where.userId,
    });

    return claims.map((claim) => convertEventRewardClaimDocumentToDto(claim));
  }

  private async validateEventConditionMatched(
    event: Event,
    user: User,
  ): Promise<boolean> {
    switch (event.condition.type) {
      case EventConditionType.SignIn: {
        const userLoginHistories = await this.userLoginHistoryRepository.find(
          { userId: user._id },
          { loginedAt: 1 },
        );
        const currentDay = dayjs().startOf('day');

        const targetHistories = userLoginHistories.filter(
          (history) =>
            !dayjs(history.loginedAt).startOf('day').diff(currentDay),
        );

        if (event.condition.operation === 'AFTER') {
          const lastLoginedAt = dayjs(targetHistories[0]?.loginedAt).startOf(
            'day',
          );

          return !!currentDay.diff(
            lastLoginedAt.add(event.condition.days, 'day'),
          );
        } else if (event.condition.operation === 'CONTINUOUS') {
          const uniqLoginDate = new Set<string>(
            userLoginHistories.map((history) =>
              dayjs(history.loginedAt).startOf('day').toISOString(),
            ),
          );

          const loginDate = [...uniqLoginDate];

          if (uniqLoginDate.size < event.condition.days) return false;

          for (let i = 1; i < event.condition.days; i++) {
            const prev = dayjs(loginDate[i - 1]);
            const curr = dayjs(loginDate[i]);

            const dayDiff = curr.diff(prev, 'day');

            if (dayDiff !== 1) {
              return false;
            }

            return true;
          }
        }

        return false;
      }
      case EventConditionType.SignUp: {
        if (event.condition.operation === 'AFTER') {
          return !!dayjs()
            .startOf('day')
            .diff(
              dayjs(user.createdAt).startOf('day').add(event.condition.days),
            );
        }

        return false;
      }
      default:
        return false;
    }
  }
}
