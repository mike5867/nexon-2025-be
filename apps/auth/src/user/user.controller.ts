import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetUserRPCRequest,
  GetUserRPCResponse,
  GrantUserRoleRPCRequest,
  GrantUserRoleRPCResponse,
} from 'lib/interfaces/auth.interface';
import { AuthRPCMessagePattern } from 'lib/rpc/auth.message.pattern';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(AuthRPCMessagePattern.GetUser)
  async getUserById(data: GetUserRPCRequest): Promise<GetUserRPCResponse> {
    const user = await this.userService.getUserDtoById(data.userId);

    return { user };
  }

  @MessagePattern(AuthRPCMessagePattern.GrantUserRole)
  async grantUserRole(
    data: GrantUserRoleRPCRequest,
  ): Promise<GrantUserRoleRPCResponse> {
    const user = await this.userService.grantUserRole(data.userId, data.role);

    return { user };
  }
}
