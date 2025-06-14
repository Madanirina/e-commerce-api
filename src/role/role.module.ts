import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from '../role/controller/role.controller';
import { RoleService } from '../role/service/role.service';
import { Role, RoleSchema } from '../role/schema/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
