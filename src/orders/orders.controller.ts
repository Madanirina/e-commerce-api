import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ZeebeService } from '../camunda/camunda.service'

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService, private readonly zeebeService: ZeebeService) {}

  @Post()
  create(@Body() body) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.service.updateStatus(id, status);
  }

  @Post('start')
  async startOrderProcess(@Body('orderId') orderId: string) {
    return this.zeebeService.startOrderWorkflow(orderId);
  }
}