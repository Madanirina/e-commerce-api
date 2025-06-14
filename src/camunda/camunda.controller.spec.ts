import { Test, TestingModule } from '@nestjs/testing';
import { CamundaController } from './camunda.controller';
import { CamundaService } from './camunda.service';

describe('CamundaController', () => {
  let controller: CamundaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CamundaController],
      providers: [CamundaService],
    }).compile();

    controller = module.get<CamundaController>(CamundaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
