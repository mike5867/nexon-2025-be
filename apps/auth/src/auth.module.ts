import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';
import { User, UserSchema } from './user/user.schema';
import { UserLoginHistoryRepository } from './user/userLoginHistory.repository';
import {
  UserLoginHistory,
  UserLoginHistorySchema,
} from './user/userLoginHistory.schema';

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
    AuthModule,
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: UserLoginHistory.name, schema: UserLoginHistorySchema },
    ]),
  ],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    UserService,
    JwtService,
    UserRepository,
    UserLoginHistoryRepository,
  ],
})
export class AuthModule {}
