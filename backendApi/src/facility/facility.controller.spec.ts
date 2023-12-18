import { Test, TestingModule } from '@nestjs/testing';
import { FacilityController } from './facility.controller';
import { FacilityService } from './facility.service';

describe('FacilityController', () => {
  let controller: FacilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilityController],
      providers: [FacilityService],
    }).compile();

    controller = module.get<FacilityController>(FacilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
