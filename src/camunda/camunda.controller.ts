import { Controller } from '@nestjs/common';
import { CamundaService } from './camunda.service';

@Controller('camunda')
export class CamundaController {
  constructor(private readonly camundaService: CamundaService) {}
}
