import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto, @Req() request) {
    return this.permissionsService.create(createPermissionDto, request.user.user_id);
  }

  @Get('all')
  findAll() {
    return this.permissionsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updatePermissionDto: UpdatePermissionDto, @Req() request) {
    return this.permissionsService.update(updatePermissionDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request) {
    return this.permissionsService.remove(id, request.user.user_id);
  }
}
