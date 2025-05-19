import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from 'lib/interfaces/auth.interface';
import { AuthRPCMessagePattern } from 'lib/rpc/auth.message.pattern';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AuthRPCMessagePattern.SignUp)
  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    const user = await this.authService.signUp(
      data.email,
      data.password,
      data.name,
    );

    return { user };
  }

  @MessagePattern(AuthRPCMessagePattern.SignIn)
  async signIn(data: SignInRequest): Promise<SignInResponse> {
    const token = await this.authService.signIn(data.email, data.password);

    return { accessToken: token };
  }
}
