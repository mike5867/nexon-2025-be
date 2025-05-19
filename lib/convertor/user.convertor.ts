import { User } from 'apps/auth/src/user/user.schema';
import { UserDto } from 'lib/dto/user.dto';

export function convertUserDocumentToUser(userDocument: User): UserDto {
  return {
    id: userDocument._id,
    name: userDocument.name,
    email: userDocument.email,
    role: userDocument.role,
  };
}
