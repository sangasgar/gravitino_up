import { Test, TestingModule } from '@nestjs/testing';
import { PriorityService } from './priority.service';

describe('PriorityService', () => {
  let service: PriorityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriorityService],
    }).compile();

    service = module.get<PriorityService>(PriorityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
