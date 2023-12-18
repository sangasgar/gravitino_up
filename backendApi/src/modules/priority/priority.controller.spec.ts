import { Test, TestingModule } from '@nestjs/testing';
import { PriorityController } from './priority.controller';
import { PriorityService } from './priority.service';

describe('PriorityController', () => {
  let controller: PriorityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriorityController],
      providers: [PriorityService],
    }).compile();

    controller = module.get<PriorityController>(PriorityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
