import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('checkpoint')
@Controller('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCheckpointDto: CreateCheckpointDto) {
    return this.checkpointService.create(createCheckpointDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.checkpointService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.checkpointService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Body() updateCheckpointDto: UpdateCheckpointDto) {
    return this.checkpointService.update(updateCheckpointDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.checkpointService.remove(+id);
  }
}