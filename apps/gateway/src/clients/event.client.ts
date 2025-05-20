import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateEventRequest,
  CreateEventResponse,
  GetEventsRPCRequest,
  GetEventsRPCResponse,
} from 'lib/interfaces/event.interface';
import {
  AddRewardToEventRPCRequest,
  AddRewardToEventRPCResponse,
  ClaimEventRewardRPCRequest,
  ClaimEventRewardRPCResponse,
  GetEventRewardClaimsRPCRequest,
  GetEventRewardClaimsRPCResponse,
} from 'lib/interfaces/reward.interface';
import { EventRPCMessagePattern } from 'lib/rpc/event.message.pattern';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventClient {
  constructor(@Inject('EVENT_SERVICE') private readonly client: ClientProxy) {}

  async createEvent(req: CreateEventRequest): Promise<CreateEventResponse> {
    return firstValueFrom(
      this.client.send<CreateEventResponse, CreateEventRequest>(
        EventRPCMessagePattern.CreateEvent,
        req,
      ),
    );
  }

  async getEvents(req: GetEventsRPCRequest): Promise<GetEventsRPCResponse> {
    return firstValueFrom(
      this.client.send<GetEventsRPCResponse, GetEventsRPCRequest>(
        EventRPCMessagePattern.GetEvents,
        req,
      ),
    );
  }

  async addEventReward(
    req: AddRewardToEventRPCRequest,
  ): Promise<AddRewardToEventRPCResponse> {
    return firstValueFrom(
      this.client.send<AddRewardToEventRPCResponse, AddRewardToEventRPCRequest>(
        EventRPCMessagePattern.AddEventReward,
        req,
      ),
    );
  }

  async claimEventReward(
    req: ClaimEventRewardRPCRequest,
  ): Promise<ClaimEventRewardRPCResponse> {
    return firstValueFrom(
      this.client.send<ClaimEventRewardRPCResponse, ClaimEventRewardRPCRequest>(
        EventRPCMessagePattern.ClaimEventReward,
        req,
      ),
    );
  }

  async getEventRewardClaims(
    req: GetEventRewardClaimsRPCRequest,
  ): Promise<GetEventRewardClaimsRPCResponse> {
    return firstValueFrom(
      this.client.send<
        GetEventRewardClaimsRPCResponse,
        GetEventRewardClaimsRPCRequest
      >(EventRPCMessagePattern.GetEventRewardClaim, req),
    );
  }
}
