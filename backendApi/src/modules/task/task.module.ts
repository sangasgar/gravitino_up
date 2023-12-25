import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [SequelizeModule.forFeature([Task]), CategoryModule, TransactionHistoryModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
