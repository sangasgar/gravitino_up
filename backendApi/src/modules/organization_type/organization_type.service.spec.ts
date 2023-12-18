import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationTypeService } from './organization_type.service';

describe('OrganizationTypeService', () => {
  let service: OrganizationTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationTypeService],
    }).compile();

    service = module.get<OrganizationTypeService>(OrganizationTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
