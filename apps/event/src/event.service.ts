import { Injectable } from '@nestjs/common';
import { EventRepository } from './event.repository';
import { EventCondition, EventDto } from 'lib/dto/event.dto';
import { convertEventDocumentToDto } from 'lib/convertor/event.convertor';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async createEvent(
    description: string,
    condition: EventCondition,
    isEnabled: boolean,
  ): Promise<EventDto> {
    const event = await this.eventRepository.create({
      description,
      condition,
      isEnabled,
    });

    return convertEventDocumentToDto(event);
  }

  async getEvents(where: { ids?: Array<string> }): Promise<Array<EventDto>> {
    if (!where.ids?.length) {
      return [];
    }

    const events = await this.eventRepository.find({ ids: where.ids });

    return events.map((event) => convertEventDocumentToDto(event));
  }
}
