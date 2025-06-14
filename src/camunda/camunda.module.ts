import { Module } from '@nestjs/common';
import { ZeebeService } from '../camunda/camunda.service'
@Module({
  providers: [ZeebeService]
})
export class CamundaModule {}
