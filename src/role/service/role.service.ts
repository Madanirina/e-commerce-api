import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from 'src/role/schema/role.schema';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}

  async createRole(role: Role): Promise<Role> {
    const createdRole = new this.roleModel(role);
    return createdRole.save();
  }

  async getAllRoles(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async updateRole(idRole: Types.ObjectId, role: Role) {
    return this.roleModel.findByIdAndUpdate(idRole, role).exec();
  }
}
