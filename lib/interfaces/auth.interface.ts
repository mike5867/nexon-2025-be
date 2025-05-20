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
