import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { CreatePriorityDto, UpdatePriorityDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AppError } from 'src/common/constants/error';

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
  async update(@Body() updatePriorityDto: UpdatePriorityDto, @Req() request) {
    let foundPriority = null;
    if (updatePriorityDto.priority_id) {
      foundPriority = await this.priorityService.findOne(updatePriorityDto.priority_id);
    }
    if (!foundPriority) {
      throw new HttpException(AppError.PRIORITY_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.priorityService.update(updatePriorityDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() request) {
    const foundPriority = await this.priorityService.findOne(id);
    if (foundPriority == null) {
      throw new HttpException(AppError.PRIORITY_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.priorityService.remove(+id, request.user.user_id);
  }
}
