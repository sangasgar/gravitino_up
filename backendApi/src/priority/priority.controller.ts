import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('priority')
@ApiTags('priority')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) { }

  @Post()
  create(@Body() createPriorityDto: CreatePriorityDto) {
    return this.priorityService.create(createPriorityDto);
  }

  @Get()
  findAll() {
    return this.priorityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priorityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriorityDto: UpdatePriorityDto) {
    return this.priorityService.update(+id, updatePriorityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priorityService.remove(+id);
  }
}
