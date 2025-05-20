import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { convertUserDocumentToDto } from 'lib/convertor/user.convertor';
import { UserDto, UserRole } from 'lib/dto/user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(
    email: string,
    password: string,
    name: string,
  ): Promise<UserDto> {
    const existUser = await this.userRepository.findOne({
      email,
    });

    if (existUser) {
      throw new ConflictException(`User (${existUser.email}) already exists`);
    }

    if (password.length <= 8) {
      throw new BadRequestException(`Password required more then 8 length`);
    }

    const createdUserDoc = await this.userRepository.create({
      email,
      password,
      name,
    });

    return convertUserDocumentToDto(createdUserDoc);
  }

  async grantUserRole(userId: string, role: UserRole): Promise<UserDto> {
    const user = await this.userRepository.findOne({ _id: userId });

    if (!user) {
      throw new NotFoundException(`User(${userId}) not found.`);
    }

    if (user.role === role) {
      throw new ConflictException(
        `User(${userId}) role(${role}) already granted!`,
      );
    }

    const updatedUser = await this.userRepository.update(userId, { role });

    return convertUserDocumentToDto(updatedUser);
  }

  async getUserDocumentByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException(`User(${email}) not found.`);
    }

    return user;
  }

  async getUserDtoById(userId: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({ _id: userId });

    if (!user) {
      throw new NotFoundException(`User(${userId}) not found.`);
    }

    return convertUserDocumentToDto(user);
  }
}
