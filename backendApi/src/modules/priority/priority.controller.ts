import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiBearerAuth()
@Controller('priority')
@ApiTags('priority')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPriorityDto: CreatePriorityDto, @Req() request) {
    return this.priorityService.create(createPriorityDto, request.user.user_id);
  }

  @Get('all')
  findAll() {
    return this.priorityService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updatePriorityDto: UpdatePriorityDto, @Req() request) {
    return this.priorityService.update(updatePriorityDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request) {
    return this.priorityService.remove(+id, request.user.user_id);
  }
}
