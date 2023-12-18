import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('checkpoint')
@Controller('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) { }

  @Post()
  create(@Body() createCheckpointDto: CreateCheckpointDto) {
    return this.checkpointService.create(createCheckpointDto);
  }

  @Get()
  findAll() {
    return this.checkpointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.checkpointService.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updateCheckpointDto: UpdateCheckpointDto) {
    return this.checkpointService.update(updateCheckpointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.checkpointService.remove(+id);
  }
}
