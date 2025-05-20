import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, RootFilterQuery, UpdateQuery } from 'mongoose';
import { EventRewardClaim } from './reward.schema';

@Injectable()
export class EventRewardClaimRepository {
  constructor(
    @InjectModel(EventRewardClaim.name)
    private readonly eventRewardClaimModel: Model<EventRewardClaim>,
  ) {}

  async create(req: {
    userId: string;
    eventId: string;
  }): Promise<EventRewardClaim> {
    return this.eventRewardClaimModel.create({
      user: req.userId,
      event: req.eventId,
    });
  }

  async find(where: { userId?: string }): Promise<Array<EventRewardClaim>> {
    const whereConditions: RootFilterQuery<EventRewardClaim> = {};

    if (where.userId) {
      whereConditions.user = where.userId;
    }
    const document = await this.eventRewardClaimModel.find(whereConditions);

    return document;
  }

  async update(
    id: string,
    update: Partial<Pick<EventRewardClaim, 'status'>>,
  ): Promise<EventRewardClaim> {
    const updateQuery: UpdateQuery<EventRewardClaim> = {};

    if ('status' in update) {
      updateQuery.status = update.status;
    }

    const updated = await this.eventRewardClaimModel.findByIdAndUpdate(
      id,
      updateQuery,
      {
        new: true,
      },
    );

    if (!updated) {
      throw new NotFoundException('Document not found');
    }

    return updated;
  }
}
