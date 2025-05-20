import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import JwtStrategy from './auth/jwt.strategy';
import { RolesGuard } from './auth/role.guard';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthClient } from './clients/auth.client';
import { EventController } from './controllers/event.controller';
import { EventClient } from './clients/event.client';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST || '127.0.0.1',
          port: process.env.AUTH_SERVICE_PORT
            ? parseInt(process.env.AUTH_SERVICE_PORT)
            : 4001,
        },
      },
      {
        name: 'EVENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.EVENT_SERVICE_HOST || '127.0.0.1',
          port: process.env.EVENT_SERVICE_PORT
            ? parseInt(process.env.EVENT_SERVICE_PORT)
            : 5001,
        },
      },
    ]),
    PassportModule,
    JwtModule.register({ secret: 'jwt_secret' }),
  ],
  controllers: [UserController, AuthController, EventController],
  providers: [JwtStrategy, JwtAuthGuard, RolesGuard, AuthClient, EventClient],
})
export class GatewayModule {}
