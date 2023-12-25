import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CategoryService } from '../category/category.service';
import { AppError } from 'src/common/constants/error';

@ApiBearerAuth()
@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly categoryService: CategoryService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request) {
    const foundCategory = await this.categoryService.findOne(createTaskDto.category_id);
    if (!foundCategory) {
      throw new HttpException(AppError.CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return this.taskService.create(createTaskDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    return this.taskService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateTaskDto: UpdateTaskDto, @Req() request) {
    let foundTask = null;
    if (updateTaskDto.task_id) {
      foundTask = await this.taskService.findOne(updateTaskDto.task_id);
    }

    if (!foundTask) {
      throw new HttpException(AppError.TASK_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    if (updateTaskDto.category_id) {
      const foundCategory = await this.categoryService.findOne(updateTaskDto.category_id);
      if (!foundCategory) {
        throw new HttpException(AppError.CATEGORY_NOT_FOUND, HttpStatus.NOT_FOUND)
      }
    }

    return this.taskService.update(updateTaskDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() request) {
    const foundTask = await this.taskService.findOne(id);
    if (!foundTask) {
      throw new HttpException(AppError.TASK_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return this.taskService.remove(+id, request.user.user_id);
  }
}
