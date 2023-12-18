import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Organization } from './entities/organization.entity';

@ApiBearerAuth()
@ApiTags('organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @Post()
  @ApiOperation({ summary: 'Создание новой организации' })
  @ApiResponse({ status: 201, description: 'Организация успешно создана!' })
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех организаций' })
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение отдельной организации' })
  @ApiResponse({
    status: 200,
    description: 'Найденная запись',
    type: Organization,
  })
  findOne(@Param('id') id: number) {
    return this.organizationService.findOne(+id);
  }

  @Patch()
  @ApiOperation({ summary: 'Обновление отдельной организации' })
  @ApiResponse({ status: 200, description: 'Организация успешно обновлена!' })
  @ApiResponse({ status: 404, description: 'Организация не существует!' })
  @ApiResponse({ status: 403, description: 'Forbidden!' })
  update(@Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.update(updateOrganizationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление отдельной организации' })
  @ApiResponse({ status: 201, description: 'Организация успешно удалена!' })
  @ApiResponse({ status: 404, description: 'Организация не существует!' })
  remove(@Param('id') id: number) {
    return this.organizationService.remove(+id);
  }
}
