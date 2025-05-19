import { UserDto, UserRole } from 'lib/dto/user.dto';

export interface AuthenticatedRequest extends Request {
  user?: UserDto;
}

export interface JwtPayload {
  userId: string;
  role: UserRole;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

export interface SignUpResponse {
  user: UserDto;
}

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
