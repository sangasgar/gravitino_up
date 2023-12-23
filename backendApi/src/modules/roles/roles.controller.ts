import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 201, description: 'Роль успешно создана!' })
  create(@Body() createRoleDto: CreateRoleDto, @Req() request) {
    return this.rolesService.create(createRoleDto, request.user.user_id);
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

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Изменение отдельной роли' })
  @ApiResponse({ status: 200, description: 'Роль успешно обновлена!' })
  @ApiResponse({ status: 404, description: 'Роль не существует!' })
  update(@Body() updateRoleDto: UpdateRoleDto, @Req() request) {
    return this.rolesService.update(updateRoleDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление отдельной роли' })
  @ApiResponse({ status: 201, description: 'Роль успешно удалена!' })
  @ApiResponse({ status: 404, description: 'Роль не существует!' })
  remove(@Param('id') id: number, @Req() request) {
    return this.rolesService.remove(+id, request.user.user_id);
  }
}
