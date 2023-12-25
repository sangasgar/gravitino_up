import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AppError } from 'src/common/constants/error';
import { OrganizationTypeService } from '../organization_type/organization_type.service';

@ApiBearerAuth()
@ApiTags('organization')
@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly organizationTypeService: OrganizationTypeService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создание новой организации' })
  @ApiResponse({ status: 201, description: 'Организация успешно создана!' })
  async create(@Body() createOrganizationDto: CreateOrganizationDto, @Req() request) {
    let foundOrganizationType = null;
    if (createOrganizationDto.organization_type_id) {
      foundOrganizationType = await this.organizationTypeService.findOne(createOrganizationDto.organization_type_id);
    }
    if (!foundOrganizationType) {
      throw new HttpException(AppError.ORGANIZATION_TYPE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.organizationService.create(createOrganizationDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiOperation({ summary: 'Получение всех организаций' })
  findAll() {
    return this.organizationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Обновление отдельной организации' })
  @ApiResponse({ status: 200, description: 'Организация успешно обновлена!' })
  @ApiResponse({ status: 404, description: 'Организация не существует!' })
  @ApiResponse({ status: 403, description: 'Forbidden!' })
  async update(@Body() updateOrganizationDto: UpdateOrganizationDto, @Req() request) {
    let foundOrganization = null;
    if (updateOrganizationDto.organization_id) {
      foundOrganization = await this.organizationService.findOne(updateOrganizationDto.organization_id);
    }
    if (!foundOrganization) {
      throw new HttpException(AppError.ORGANIZATION_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    let foundOrganizationType = null;
    if (updateOrganizationDto.organization_type_id) {
      foundOrganizationType = await this.organizationTypeService.findOne(updateOrganizationDto.organization_type_id);
    }
    if (!foundOrganizationType) {
      throw new HttpException(AppError.ORGANIZATION_TYPE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.organizationService.update(updateOrganizationDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление отдельной организации' })
  @ApiResponse({ status: 201, description: 'Организация успешно удалена!' })
  @ApiResponse({ status: 404, description: 'Организация не существует!' })
  async remove(@Param('id') id: number, @Req() request) {
    const foundOrganization = await this.organizationService.findOne(id);
    if (foundOrganization == null) {
      throw new HttpException(AppError.ORGANIZATION_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.organizationService.remove(+id, request.user.user_id);
  }
}
