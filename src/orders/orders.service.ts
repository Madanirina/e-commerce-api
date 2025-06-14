import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(data): Promise<Order> {
    const created = new this.orderModel(data);
    return created.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findByUser(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId }).exec();
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    const updated = await this.orderModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) throw new NotFoundException('Order not found');
    return updated;
  }
}