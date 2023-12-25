import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/modules/category/entities/category.entity';
import { Task } from './entities/task.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { StatusTaskResponse, TaskResponse } from './response';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    private readonly historyService: TransactionHistoryService,
  ) { }

  async create(task: CreateTaskDto, user_id: number): Promise<TaskResponse> {
    try {
      const newTask = await this.taskRepository.create(task);

      const historyDto = {
        "user_id": user_id,
        "comment": `Создана задача #${newTask.task_id}`,
      }
      await this.historyService.create(historyDto);

      return newTask;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<TaskResponse[]> {
    try {
      const result = await this.taskRepository.findAll({ include: [Category], attributes: { exclude: ['category_id'] } });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(task_id: number): Promise<boolean> {
    try {
      const foundTask = await this.taskRepository.findOne({ where: { task_id } });

      if (foundTask) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(updatedTask: UpdateTaskDto, user_id: number): Promise<TaskResponse> {
    try {
      await this.taskRepository.update({ ...updatedTask }, { where: { task_id: updatedTask.task_id } });

      const foundTask = await this.taskRepository.findOne({ where: { task_id: updatedTask.task_id } });

      if (foundTask) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Изменена задача #${foundTask.task_id}`,
        }
        await this.historyService.create(historyDto);
      }

      return foundTask;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(task_id: number, user_id: number): Promise<StatusTaskResponse> {
    try {
      const deleteTask = await this.taskRepository.destroy({ where: { task_id } });

      if (deleteTask) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Удалена задача #${task_id}`,
        }
        await this.historyService.create(historyDto);

        return { status: true };
      }

      return { status: false };
    } catch (error) {
      throw new Error(error);
    }
  }
}
