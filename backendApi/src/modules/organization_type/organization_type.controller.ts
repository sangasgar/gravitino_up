import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { OrganizationTypeService } from './organization_type.service';
import { CreateOrganizationTypeDto, UpdateOrganizationTypeDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AppError } from 'src/common/constants/error';

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

  @Get('all')
  findAll() {
    return this.organizationTypeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateOrganizationTypeDto: UpdateOrganizationTypeDto, @Req() request) {
    let foundOrganizationType = null;
    if (updateOrganizationTypeDto.organization_type_id) {
      foundOrganizationType = await this.organizationTypeService.findOne(updateOrganizationTypeDto.organization_type_id);
    }
    if (!foundOrganizationType) {
      throw new HttpException(AppError.ORGANIZATION_TYPE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.organizationTypeService.update(updateOrganizationTypeDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() request) {
    const foundOrganizationType = await this.organizationTypeService.findOne(id);
    if (!foundOrganizationType) {
      throw new HttpException(AppError.ORGANIZATION_TYPE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.organizationTypeService.remove(+id, request.user.user_id);
  }
}
