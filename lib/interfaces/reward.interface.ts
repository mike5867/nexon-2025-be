/* eslint-disable @typescript-eslint/no-empty-object-type */
import { EventDto } from 'lib/dto/event.dto';
import { EventReward, EventRewardClaimDto } from 'lib/dto/reward.dto';

export interface AddRewardToEventRequest {
  reward: EventReward;
}

export interface AddRewardToEventResponse {
  event: EventDto;
}

export interface AddRewardToEventRPCRequest extends AddRewardToEventRequest {
  eventId: string;
}

export type AddRewardToEventRPCResponse = AddRewardToEventResponse;

export interface ClaimEventRewardRequest {}

export interface ClaimEventRewardResponse {
  claim: EventRewardClaimDto;
}

export interface ClaimEventRewardRPCRequest extends ClaimEventRewardRequest {
  eventId: string;
  userId: string;
}

export type ClaimEventRewardRPCResponse = ClaimEventRewardResponse;

export interface GetEventRewardClaimsRequest {}

export interface GetEventRewardClaimsResponse {
  claims: Array<EventRewardClaimDto>;
}

export interface GetEventRewardClaimsRPCRequest
  extends GetEventRewardClaimsRequest {
  userId?: string;
}

export type GetEventRewardClaimsRPCResponse = GetEventRewardClaimsResponse;

export interface GetMyEventRewardClaimsRequest {}

export interface GetMyEventRewardClaimsResponse {
  claims: Array<EventRewardClaimDto>;
}
