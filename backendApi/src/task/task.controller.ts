import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  ) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taskService.remove(+id);
  }
}
