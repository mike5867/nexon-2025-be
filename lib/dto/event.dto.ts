import { EventReward } from './reward.dto';

export type EventDto = {
  id: string;
  description: string;
  condition: EventCondition;
  createdAt: Date;
  endAt?: Date;
  isEnabled: boolean;
  rewards?: Array<EventReward>;
};

export enum EventConditionType {
  SignUp = 'SIGN_UP',
  SignIn = 'SIGN_IN',
}

export type EventCondition = SignUpEventCondition | SignInEventCondition;

export class SignUpEventCondition {
  type: EventConditionType.SignUp;
  operation: 'AFTER';
  days: number;
}

export class SignInEventCondition {
  type: EventConditionType.SignIn;
  operation: 'CONTINUOUS' | 'AFTER';
  days: number;
}
