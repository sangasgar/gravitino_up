import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @Req() request) {
    return this.groupService.create(createGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.groupService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Body() updateGroupDto: UpdateGroupDto, @Req() request) {
    return this.groupService.update(updateGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() request) {
    return this.groupService.remove(+id);
  }
}
