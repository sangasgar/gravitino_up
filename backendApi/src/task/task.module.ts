import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [SequelizeModule.forFeature([Task, Category])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
