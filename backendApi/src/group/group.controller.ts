import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.groupService.remove(+id);
  }
}
