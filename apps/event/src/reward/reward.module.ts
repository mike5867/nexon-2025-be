import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { EventRewardClaim, EventRewardClaimSchema } from './reward.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from '../event.schema';
import { EventRepository } from '../event.repository';
import { EventRewardClaimRepository } from './reward.repository';
import { UserRepository } from 'apps/auth/src/user/user.repository';
import { UserLoginHistoryRepository } from 'apps/auth/src/user/userLoginHistory.repository';
import { User, UserSchema } from 'apps/auth/src/user/user.schema';
import {
  UserLoginHistory,
  UserLoginHistorySchema,
} from 'apps/auth/src/user/userLoginHistory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([
      { name: EventRewardClaim.name, schema: EventRewardClaimSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: UserLoginHistory.name, schema: UserLoginHistorySchema },
    ]),
  ],
  controllers: [RewardController],
  providers: [
    RewardService,
    EventRepository,
    EventRewardClaimRepository,
    UserRepository,
    UserLoginHistoryRepository,
  ],
})
export class RewardModule {}
