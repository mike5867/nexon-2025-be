import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLoginHistory } from './userLoginHistory.schema';

@Injectable()
export class UserLoginHistoryRepository {
  constructor(
    @InjectModel(UserLoginHistory.name)
    private readonly userLoginHistoryModel: Model<UserLoginHistory>,
  ) {}

  async create(userId: string): Promise<UserLoginHistory> {
    return this.userLoginHistoryModel.create({ user: userId });
  }

  async find(
    where?: { userId: string },
    sort?: Record<keyof Partial<Pick<UserLoginHistory, 'loginedAt'>>, -1 | 1>,
  ): Promise<Array<UserLoginHistory>> {
    const document = await this.userLoginHistoryModel
      .find({ ...where })
      .sort({ ...sort });

    return document;
  }
}
