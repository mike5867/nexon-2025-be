import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { RewardModule } from './reward/reward.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './event.schema';
import {
  EventRewardClaim,
  EventRewardClaimSchema,
} from './reward/reward.schema';
import { EventRepository } from './event.repository';
import { EventRewardClaimRepository } from './reward/reward.repository';
import { RewardController } from './reward/reward.controller';
import { RewardService } from './reward/reward.service';
import {
  UserLoginHistory,
  UserLoginHistorySchema,
} from 'apps/auth/src/user/userLoginHistory.schema';
import { User, UserSchema } from 'apps/auth/src/user/user.schema';
import { UserRepository } from 'apps/auth/src/user/user.repository';
import { UserLoginHistoryRepository } from 'apps/auth/src/user/userLoginHistory.repository';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        dbName: configService.get<string>('MONGO_DB'),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RewardModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([
      { name: EventRewardClaim.name, schema: EventRewardClaimSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: UserLoginHistory.name, schema: UserLoginHistorySchema },
    ]),
  ],
  controllers: [EventController, RewardController],
  providers: [
    EventService,
    RewardService,
    EventRepository,
    EventRewardClaimRepository,
    UserRepository,
    UserLoginHistoryRepository,
  ],
})
export class EventModule {}
