import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('checkpoint')
@Controller('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCheckpointDto: CreateCheckpointDto, @Req() request) {
    return this.checkpointService.create(createCheckpointDto, request.user.user_id);
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
  update(@Body() updateCheckpointDto: UpdateCheckpointDto, @Req() request) {
    return this.checkpointService.update(updateCheckpointDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() request) {
    return this.checkpointService.remove(+id, request.user.user_id);
  }
}
