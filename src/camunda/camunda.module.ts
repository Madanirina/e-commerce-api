import { Module } from '@nestjs/common';
import { CamundaService } from './camunda.service';
import { CamundaController } from './camunda.controller';

@Module({
  controllers: [CamundaController],
  providers: [CamundaService]
})
export class CamundaModule {}
