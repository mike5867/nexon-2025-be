import { UserDto, UserRole } from 'lib/dto/user.dto';

export interface GrantUserRoleRequest {
  role: UserRole;
}

export interface GrantUserRoleResponse {
  user: UserDto;
}

export interface GrantUserRoleRPCRequest extends GrantUserRoleRequest {
  userId: string;
}

export type GrantUserRoleRPCResponse = GrantUserRoleResponse;

export interface GetUserRPCRequest {
  userId: string;
}

export interface GetUserRPCResponse {
  user: UserDto;
}
