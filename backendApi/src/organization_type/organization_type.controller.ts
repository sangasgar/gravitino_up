import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationTypeService } from './organization_type.service';
import { CreateOrganizationTypeDto } from './dto/create-organization_type.dto';
import { UpdateOrganizationTypeDto } from './dto/update-organization_type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('organization-type')
@Controller('organization-type')
export class OrganizationTypeController {
  constructor(private readonly organizationTypeService: OrganizationTypeService) { }

  @Post()
  create(@Body() createOrganizationTypeDto: CreateOrganizationTypeDto) {
    return this.organizationTypeService.create(createOrganizationTypeDto);
  }

  @Get()
  findAll() {
    return this.organizationTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.organizationTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updateOrganizationTypeDto: UpdateOrganizationTypeDto) {
    return this.organizationTypeService.update(updateOrganizationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.organizationTypeService.remove(+id);
  }
}
