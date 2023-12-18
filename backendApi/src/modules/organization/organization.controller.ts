import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Organization } from './entities/organization.entity';
import { JwtAuthGuard } from 'src/modules/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создание новой организации' })
  @ApiResponse({ status: 201, description: 'Организация успешно создана!' })
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Получение всех организаций' })
  findAll() {
    return this.organizationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Обновление отдельной организации' })
  @ApiResponse({ status: 200, description: 'Организация успешно обновлена!' })
  @ApiResponse({ status: 404, description: 'Организация не существует!' })
  @ApiResponse({ status: 403, description: 'Forbidden!' })
  update(@Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.update(updateOrganizationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление отдельной организации' })
  @ApiResponse({ status: 201, description: 'Организация успешно удалена!' })
  @ApiResponse({ status: 404, description: 'Организация не существует!' })
  remove(@Param('id') id: number) {
    return this.organizationService.remove(+id);
  }
}
