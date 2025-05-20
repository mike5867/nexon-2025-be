import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { EventCondition } from 'lib/dto/event.dto';
import { EventReward } from 'lib/dto/reward.dto';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document<string> {
  @IsNotEmpty()
  @Prop({ required: true })
  description: string;

  @IsNotEmpty()
  @Prop({ type: Object, required: true })
  condition: EventCondition;

  @IsNotEmpty()
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date })
  endAt: Date;

  @IsNotEmpty()
  @IsBoolean()
  @Prop({ type: Boolean })
  isEnabled: boolean;

  @Prop({ required: false })
  rewards: Array<EventReward>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
