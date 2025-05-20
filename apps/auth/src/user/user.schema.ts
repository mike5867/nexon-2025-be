import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'lib/dto/user.dto';
import { Document } from 'mongoose';

@Schema()
export class User extends Document<string> {
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  name: string;

  @IsNotEmpty()
  @Prop({ type: String, enum: UserRole, default: UserRole.User })
  role: UserRole;

  @IsNotEmpty()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
