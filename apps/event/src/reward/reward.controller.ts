import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  AddRewardToEventRPCRequest,
  AddRewardToEventRPCResponse,
  ClaimEventRewardRPCRequest,
  ClaimEventRewardRPCResponse,
  GetEventRewardClaimsRPCRequest,
  GetEventRewardClaimsRPCResponse,
} from 'lib/interfaces/reward.interface';
import { EventRPCMessagePattern } from 'lib/rpc/event.message.pattern';
import { RewardService } from './reward.service';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @MessagePattern(EventRPCMessagePattern.AddEventReward)
  async addEventReward(
    data: AddRewardToEventRPCRequest,
  ): Promise<AddRewardToEventRPCResponse> {
    const event = await this.rewardService.addEventReword(
      data.eventId,
      data.reward,
    );

    return { event };
  }

  @MessagePattern(EventRPCMessagePattern.ClaimEventReward)
  async claimEventReward(
    data: ClaimEventRewardRPCRequest,
  ): Promise<ClaimEventRewardRPCResponse> {
    const claim = await this.rewardService.claimEventReward(
      data.eventId,
      data.userId,
    );

    return { claim };
  }

  @MessagePattern(EventRPCMessagePattern.ClaimEventReward)
  async getEventRewardClaims(
    data: GetEventRewardClaimsRPCRequest,
  ): Promise<GetEventRewardClaimsRPCResponse> {
    const claims = await this.rewardService.getEventRewardClaims({
      userId: data.userId,
    });

    return { claims };
  }
}
