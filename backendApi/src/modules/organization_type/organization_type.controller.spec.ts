import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationTypeController } from './organization_type.controller';
import { OrganizationTypeService } from './organization_type.service';

describe('OrganizationTypeController', () => {
  let controller: OrganizationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationTypeController],
      providers: [OrganizationTypeService],
    }).compile();

    controller = module.get<OrganizationTypeController>(OrganizationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
