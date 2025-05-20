import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { EventRewardClaimStatus } from 'lib/dto/reward.dto';
import mongoose, { Document } from 'mongoose';

@Schema()
export class EventRewardClaim extends Document<string> {
  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  event: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @Prop({
    type: String,
    enum: EventRewardClaimStatus,
    default: EventRewardClaimStatus.Claimed,
  })
  status: EventRewardClaimStatus;
}

export const EventRewardClaimSchema =
  SchemaFactory.createForClass(EventRewardClaim);
