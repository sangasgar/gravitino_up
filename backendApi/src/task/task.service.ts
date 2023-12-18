import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/category/entities/category.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) { }

  async create(task: CreateTaskDto) {
    const category_id = task.category_id;
    const foundCategory = await this.categoryRepository.findOne({ where: { category_id } });

    if (foundCategory == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Категория не найдена!'
        }
      )
    }

    var newObject = await this.taskRepository.create(task);
    return newObject;
  }

  async findAll() {
    return await this.taskRepository.findAll({ include: [Category], attributes: { exclude: ['category_id'] } });
  }

  async findOne(task_id: number) {
    const result = await this.taskRepository.findOne({ where: { task_id }, include: [Category], attributes: { exclude: ['category_id'] } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Задача не найдена!'
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedTask: UpdateTaskDto) {
    const task_id = updatedTask.task_id;
    const foundTask = await this.taskRepository.findOne({ where: { task_id }, include: [Category], attributes: { exclude: ['category_id'] } });

    if (foundTask == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Задача не найдена!'
        }
      )
    }

    var foundCategory;
    if (updatedTask.category_id != undefined) {
      const category_id = updatedTask.category_id;
      foundCategory = await this.categoryRepository.findOne({ where: { category_id } });

      if (foundCategory == null) {
        return Promise.reject(
          {
            statusCode: 404,
            message: 'Категория не найдена!'
          }
        )
      }
    }

    await foundTask.update(updatedTask);

    return updatedTask;
  }

  async remove(task_id: number) {
    const foundObject = await this.taskRepository.findOne({ where: { task_id } });

    if (foundObject == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Задача не найдена!'
        }
      )
    } else {
      await this.taskRepository.destroy({ where: { task_id } });
      return { statusCode: 200, message: 'Строка успешно удалена!' };
    }
  }
}
