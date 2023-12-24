import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AppError } from 'src/common/constants/error';

@ApiBearerAuth()
@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @Req() request) {
    return this.groupService.create(createGroupDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll() {
    return this.groupService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateGroupDto: UpdateGroupDto, @Req() request) {
    let foundGroup = null;
    if (updateGroupDto.group_id) {
      foundGroup = await this.groupService.findOne(updateGroupDto.group_id);
    }
    if (!foundGroup) {
      throw new HttpException(AppError.GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.groupService.update(updateGroupDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() request) {
    const foundGroup = await this.groupService.findOne(id);
    if (!foundGroup) {
      throw new HttpException(AppError.GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.groupService.remove(+id, request.user.user_id);
  }
}
