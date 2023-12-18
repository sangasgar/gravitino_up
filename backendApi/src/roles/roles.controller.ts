import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 201, description: 'Роль успешно создана!' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка ролей' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение отдельной роли' })
  @ApiResponse({
    status: 200,
    description: 'Найденная запись',
    type: Role,
  })
  findOne(@Param('id') id: number) {
    return this.rolesService.findOne(+id);
  }

  @Patch()
  @ApiOperation({ summary: 'Изменение отдельной роли' })
  @ApiResponse({ status: 200, description: 'Роль успешно обновлена!' })
  @ApiResponse({ status: 404, description: 'Роль не существует!' })
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление отдельной роли' })
  @ApiResponse({ status: 201, description: 'Роль успешно удалена!' })
  @ApiResponse({ status: 404, description: 'Роль не существует!' })
  remove(@Param('id') id: number) {
    return this.rolesService.remove(+id);
  }
}
