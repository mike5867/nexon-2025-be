import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'lib/dto/user.dto';
import { JwtPayload } from 'lib/interfaces/auth.interface';
import { UserService } from './user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(email: string, password: string): Promise<string> {
    const userDoc = await this.userService.getUserDocumentByEmail(email);

    const match = await bcrypt.compare(password, userDoc.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload: JwtPayload = { userId: userDoc._id, role: userDoc.role };

    const token = this.jwtService.sign(payload, {
      secret: 'your-secret-key',
    });

    return token;
  }

  async signUp(
    email: string,
    password: string,
    name: string,
  ): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.userService.createUser(
      email,
      hashedPassword,
      name,
    );

    return createdUser;
  }
}
