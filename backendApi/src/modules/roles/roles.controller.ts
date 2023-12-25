import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AppError } from 'src/common/constants/error';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 201, description: 'Роль успешно создана!' })
  async create(@Body() createRoleDto: CreateRoleDto, @Req() request) {
    return this.rolesService.create(createRoleDto, request.user.user_id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Получение списка ролей' })
  async findAll() {
    return this.rolesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Изменение отдельной роли' })
  @ApiResponse({ status: 200, description: 'Роль успешно обновлена!' })
  @ApiResponse({ status: 404, description: 'Роль не существует!' })
  async update(@Body() updateRoleDto: UpdateRoleDto, @Req() request) {
    let foundRole = null;
    if (updateRoleDto.role_id) {
      foundRole = await this.rolesService.findOne(updateRoleDto.role_id);
    }

    if (!foundRole) {
      throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.rolesService.update(updateRoleDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление отдельной роли' })
  @ApiResponse({ status: 201, description: 'Роль успешно удалена!' })
  @ApiResponse({ status: 404, description: 'Роль не существует!' })
  async remove(@Param('id') id: number, @Req() request) {
    const foundRole = await this.rolesService.findOne(id);

    if (!foundRole) {
      throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.rolesService.remove(+id, request.user.user_id);
  }
}
