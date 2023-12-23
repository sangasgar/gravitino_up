import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RolesPermissionsService } from './roles_permissions.service';
import { CreateRolesPermissionDto } from './dto/create-roles_permission.dto';
import { UpdateRolesPermissionDto } from './dto/update-roles_permission.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('RolesPermissions')
@Controller('roles-permissions')
export class RolesPermissionsController {
  constructor(private readonly rolesPermissionsService: RolesPermissionsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRolesPermissionDto: CreateRolesPermissionDto, @Req() request) {
    return this.rolesPermissionsService.create(createRolesPermissionDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.rolesPermissionsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request) {
    return this.rolesPermissionsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Body() updateRolesPermissionDto: UpdateRolesPermissionDto, @Req() request) {
    return this.rolesPermissionsService.update(updateRolesPermissionDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request) {
    return this.rolesPermissionsService.remove(+id, request.user.user_id);
  }
}
