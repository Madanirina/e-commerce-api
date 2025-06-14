import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Put,
} from '@nestjs/common';
import { RoleService } from 'src/role/service/role.service';
import { Role } from 'src/role/schema/role.schema';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Types } from 'mongoose';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() role: Role): Promise<Role> {
    return this.roleService.createRole(role);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.roleService.getAllRoles();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateRole(
    @Param('id') id: Types.ObjectId,
    @Body() role: Role,
  ): Promise<Role> {
    return this.roleService.updateRole(id, role);
  }
}
