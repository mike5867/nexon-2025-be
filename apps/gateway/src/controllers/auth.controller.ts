import { Body, Controller, Post } from '@nestjs/common';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from 'lib/interfaces/auth.interface';
import { AuthClient } from '../clients/auth.client';

@Controller()
export class AuthController {
  constructor(private readonly authClient: AuthClient) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpRequest): Promise<SignUpResponse> {
    return this.authClient.signUp(body);
  }

  @Post('sign-in')
  async signIn(@Body() body: SignInRequest): Promise<SignInResponse> {
    return this.authClient.signIn(body);
  }
}
