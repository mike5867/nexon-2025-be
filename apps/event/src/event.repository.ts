import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { Event } from './event.schema';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<Event>,
  ) {}

  async create(
    req: Pick<Event, 'description' | 'condition' | 'isEnabled'>,
  ): Promise<Event> {
    return this.eventModel.create({
      description: req.description,
      condition: req.condition,
      isEnabled: req.isEnabled,
    });
  }

  async find(where: { ids?: Array<string> }): Promise<Array<Event>> {
    const documents = await this.eventModel.find({ _id: { $in: where.ids } });

    return documents;
  }

  async findOne(where: Partial<Pick<Event, '_id'>>): Promise<Event | null> {
    const document = await this.eventModel.findOne({ ...where });

    return document;
  }

  async update(
    id: string,
    update: Partial<Pick<Event, 'rewards' | 'isEnabled'>>,
  ): Promise<Event> {
    const updateQuery: UpdateQuery<Event> = {};

    if ('rewards' in update) {
      updateQuery.rewards = update.rewards;
    }

    if ('isEnabled' in update) {
      updateQuery.isEnabled = update.isEnabled;
    }

    const updated = await this.eventModel.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (!updated) {
      throw new NotFoundException('Document not found');
    }

    return updated;
  }
}
