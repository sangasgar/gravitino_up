import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto, UpdatePermissionDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { AppError } from 'src/common/constants/error';

@ApiBearerAuth()
@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto, @Req() request) {
    return this.permissionsService.create(createPermissionDto, request.user.user_id);
  }

  @Get('all')
  async findAll() {
    return this.permissionsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updatePermissionDto: UpdatePermissionDto, @Req() request) {
    let foundPermission = null;
    if (updatePermissionDto.permission_id) {
      foundPermission = await this.permissionsService.findOne(updatePermissionDto.permission_id);
    }

    if (!foundPermission) {
      throw new HttpException(AppError.PERMISSION_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.permissionsService.update(updatePermissionDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request) {
    const foundPermission = await this.permissionsService.findOne(id);
    if (!foundPermission) {
      throw new HttpException(AppError.PERMISSION_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.permissionsService.remove(id, request.user.user_id);
  }
}
