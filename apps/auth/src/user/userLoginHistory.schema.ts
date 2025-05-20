import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose, { Document } from 'mongoose';

@Schema()
export class UserLoginHistory extends Document<string> {
  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @Prop({ type: Date, required: true })
  loginedAt: Date;
}

export const UserLoginHistorySchema =
  SchemaFactory.createForClass(UserLoginHistory);
