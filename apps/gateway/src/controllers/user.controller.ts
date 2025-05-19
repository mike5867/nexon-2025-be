import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { Roles } from 'lib/decorators/roles.decorator';
import { UserRole } from 'lib/dto/user.dto';
import {
  GrantUserRoleRequest,
  GrantUserRoleResponse,
} from 'lib/interfaces/auth.interface';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { AuthClient } from '../clients/auth.client';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly authClient: AuthClient) {}

  @Put(':userId/role')
  @Roles(UserRole.Admin)
  async grantUserRole(
    @Param('userId') userId: string,
    @Body() body: GrantUserRoleRequest,
  ): Promise<GrantUserRoleResponse> {
    return this.authClient.grantRole({ userId, role: body.role });
  }
}
