import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@Controller('priority')
@ApiTags('priority')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) { }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriorityDto: UpdatePriorityDto) {
    return this.priorityService.update(+id, updatePriorityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priorityService.remove(+id);
  }
}
