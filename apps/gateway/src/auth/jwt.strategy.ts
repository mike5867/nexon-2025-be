import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { UserDto } from 'lib/dto/user.dto';
import { JwtPayload } from 'lib/interfaces/auth.interface';
import {
  GetUserRPCResponse,
  GetUserRPCRequest,
} from 'lib/interfaces/user.interface';
import { AuthRPCMessagePattern } from 'lib/rpc/auth.message.pattern';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // 실제 프로젝트에서는 환경 변수 사용 권장
    });
  }

  async validate(payload: JwtPayload): Promise<UserDto> {
    const userId = payload.userId; // 또는 Authorization 헤더에서 직접 추출

    const response = await lastValueFrom(
      this.authClient.send<GetUserRPCResponse, GetUserRPCRequest>(
        AuthRPCMessagePattern.GetUser,
        { userId },
      ),
    );

    if (!response?.user) {
      throw new UnauthorizedException('Invalid token');
    }

    return response.user; // => req.user 에 저장됨
  }
}

export default JwtStrategy;
