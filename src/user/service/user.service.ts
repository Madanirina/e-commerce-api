import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().populate('roles').exec();
  }

  async updateUser(idUser: Types.ObjectId, user: User) {
    return this.userModel.findByIdAndUpdate(idUser, user).exec();
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async getUserByUsername(username: string) {
    return await this.userModel
      .find({ username: username })
      .populate('roles')
      .exec();
  }
}
