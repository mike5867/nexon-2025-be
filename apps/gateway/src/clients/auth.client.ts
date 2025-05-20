import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from 'lib/interfaces/auth.interface';
import {
  GrantUserRoleRPCRequest,
  GrantUserRoleRPCResponse,
} from 'lib/interfaces/user.interface';
import { AuthRPCMessagePattern } from 'lib/rpc/auth.message.pattern';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthClient {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async signIn(req: SignInRequest): Promise<SignInResponse> {
    return firstValueFrom(
      this.client.send<SignInResponse, SignInRequest>(
        AuthRPCMessagePattern.SignIn,
        req,
      ),
    );
  }

  async signUp(req: SignUpRequest): Promise<SignUpResponse> {
    return firstValueFrom(
      this.client.send<SignUpResponse, SignUpRequest>(
        AuthRPCMessagePattern.SignUp,
        req,
      ),
    );
  }

  async grantRole(
    req: GrantUserRoleRPCRequest,
  ): Promise<GrantUserRoleRPCResponse> {
    return firstValueFrom(
      this.client.send<GrantUserRoleRPCResponse, GrantUserRoleRPCRequest>(
        AuthRPCMessagePattern.GrantUserRole,
        req,
      ),
    );
  }
}
