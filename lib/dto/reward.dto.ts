export type EventReward = {
  type: EventRewardType;
  amount: number;
};

export enum EventRewardType {
  Point = 'POINT',
  Coupon = 'COUPON',
}

export enum EventRewardClaimStatus {
  Claimed = 'CLAIMED',
  Done = 'DONE',
}

export type EventRewardClaimDto = {
  userId: string;
  eventId: string;
  status: EventRewardClaimStatus;
};
