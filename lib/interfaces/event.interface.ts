/* eslint-disable @typescript-eslint/no-empty-object-type */
import { EventCondition, EventDto } from 'lib/dto/event.dto';

export interface CreateEventRequest {
  description: string;
  condition: EventCondition;
  isEnabled: boolean;
}

export interface CreateEventResponse {
  event: EventDto;
}

export interface GetEventsRequest {}

export interface GetEventsResponse {
  events: Array<EventDto>;
}

export interface GetEventsRPCRequest extends GetEventsRequest {
  eventIds?: Array<string>;
}

export type GetEventsRPCResponse = GetEventsResponse;

export interface GetEventByIdRequest {}

export interface GetEventByIdResponse {
  event: EventDto;
}
