import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrganizationTypeService } from './organization_type.service';
import { CreateOrganizationTypeDto } from './dto/create-organization_type.dto';
import { UpdateOrganizationTypeDto } from './dto/update-organization_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('organization-type')
@Controller('organization-type')
export class OrganizationTypeController {
  constructor(private readonly organizationTypeService: OrganizationTypeService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrganizationTypeDto: CreateOrganizationTypeDto, @Req() request) {
    return this.organizationTypeService.create(createOrganizationTypeDto, request.user.user_id);
  }

  @Get()
  findAll() {
    return this.organizationTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.organizationTypeService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Body() updateOrganizationTypeDto: UpdateOrganizationTypeDto, @Req() request) {
    return this.organizationTypeService.update(updateOrganizationTypeDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() request) {
    return this.organizationTypeService.remove(+id, request.user.user_id);
  }
}
