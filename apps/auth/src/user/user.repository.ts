import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(req: Pick<User, 'email' | 'password' | 'name'>): Promise<User> {
    return this.userModel.create(req);
  }

  async findOne(
    where: Partial<Pick<User, '_id' | 'email' | 'name'>>,
  ): Promise<User | null> {
    const document = await this.userModel.findOne({ ...where });

    return document;
  }

  async update(id: string, update: Partial<Pick<User, 'role'>>): Promise<User> {
    const updateQuery: UpdateQuery<User> = {};

    if ('role' in update) {
      updateQuery.role = update.role;
    }

    const updated = await this.userModel.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (!updated) {
      throw new NotFoundException('Document not found');
    }

    return updated;
  }
}
