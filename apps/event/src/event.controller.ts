import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateEventRequest,
  CreateEventResponse,
  GetEventsResponse,
  GetEventsRPCRequest,
} from 'lib/interfaces/event.interface';
import { EventRPCMessagePattern } from 'lib/rpc/event.message.pattern';
import { EventService } from './event.service';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern(EventRPCMessagePattern.CreateEvent)
  async createEvent(data: CreateEventRequest): Promise<CreateEventResponse> {
    const event = await this.eventService.createEvent(
      data.description,
      data.condition,
      data.isEnabled,
    );

    return { event };
  }

  @MessagePattern(EventRPCMessagePattern.GetEvents)
  async getEvents(data: GetEventsRPCRequest): Promise<GetEventsResponse> {
    const events = await this.eventService.getEvents({ ids: data.eventIds });

    return { events };
  }
}
