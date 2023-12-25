import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { RolesPermissionsService } from './roles_permissions.service';
import { CreateRolesPermissionDto, UpdateRolesPermissionDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesService } from '../roles/roles.service';
import { PermissionsService } from '../permissions/permissions.service';
import { AppError } from 'src/common/constants/error';

@ApiBearerAuth()
@ApiTags('RolesPermissions')
@Controller('roles-permissions')
export class RolesPermissionsController {
  constructor(
    private readonly rolesPermissionsService: RolesPermissionsService,
    private readonly rolesService: RolesService,
    private readonly permissionsService: PermissionsService,
    //private readonly usersService: UsersService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createRolesPermissionDto: CreateRolesPermissionDto, @Req() request) {
    const foundRole = await this.rolesService.findOne(createRolesPermissionDto.role_id);
    if (!foundRole) {
      throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    const foundPermission = await this.permissionsService.findOne(createRolesPermissionDto.permission_id);
    if (!foundPermission) {
      throw new HttpException(AppError.PERMISSION_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    // const foundUser = await this.usersService.findOne(createRolesPermissionDto.user_id);
    // if (!foundUser) {
    //   throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND)
    // }

    return this.rolesPermissionsService.create(createRolesPermissionDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    return this.rolesPermissionsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateRolesPermissionDto: UpdateRolesPermissionDto, @Req() request) {
    let foundRolePermission = null;
    if (updateRolesPermissionDto.role_permission_id) {
      foundRolePermission = await this.rolesPermissionsService.findOne(updateRolesPermissionDto.role_permission_id);
    }

    if (!foundRolePermission) {
      throw new HttpException(AppError.ROLE_PERMISSION_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    if (updateRolesPermissionDto.role_id) {
      const foundRole = await this.rolesService.findOne(updateRolesPermissionDto.role_id);
      if (!foundRole) {
        throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.NOT_FOUND)
      }
    }

    if (updateRolesPermissionDto.permission_id) {
      const foundPermission = await this.permissionsService.findOne(updateRolesPermissionDto.permission_id);
      if (!foundPermission) {
        throw new HttpException(AppError.PERMISSION_NOT_FOUND, HttpStatus.NOT_FOUND)
      }
    }

    return this.rolesPermissionsService.update(updateRolesPermissionDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() request) {
    const foundRolePermission = await this.rolesPermissionsService.findOne(id);
    if (!foundRolePermission) {
      throw new HttpException(AppError.ROLE_PERMISSION_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return this.rolesPermissionsService.remove(+id, request.user.user_id);
  }
}
