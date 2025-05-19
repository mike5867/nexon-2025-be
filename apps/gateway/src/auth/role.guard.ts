import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'lib/decorators/roles.decorator';
import { UserRole } from 'lib/dto/user.dto';
import { AuthenticatedRequest } from 'lib/interfaces/auth.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 컨트롤러/핸들러에 설정된 역할 가져오기
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 필요한 역할이 없으면 접근 허용
    if (!requiredRoles?.length) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<AuthenticatedRequest>();

    // 사용자가 없으면 접근 거부
    if (!user) {
      throw new ForbiddenException('인증이 필요합니다.');
    }

    // 사용자의 역할이 필요한 역할 중 하나라도 포함되어 있는지 확인
    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }

    return true;
  }
}
