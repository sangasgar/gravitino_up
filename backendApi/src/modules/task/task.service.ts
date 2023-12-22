import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/modules/category/entities/category.entity';
import { Task } from './entities/task.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    @InjectModel(Category) private categoryRepository: typeof Category,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(task: CreateTaskDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const category_id = task.category_id;
      const foundCategory = await this.categoryRepository.findOne({ where: { category_id } });

      if (foundCategory == null) {
        throw new HttpException('Категория не найдена!', HttpStatus.BAD_REQUEST);
      }

      result = await this.taskRepository.create(task, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Создана задача #${result.task_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return result;
  }

  async findAll() {
    return await this.taskRepository.findAll({ include: [Category], attributes: { exclude: ['category_id'] } });
  }

  async findOne(task_id: number) {
    const result = await this.taskRepository.findOne({ where: { task_id }, include: [Category], attributes: { exclude: ['category_id'] } });

    if (!result) {
      throw new HttpException('Задача не найдена!', HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }

  async update(updatedTask: UpdateTaskDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const task_id = updatedTask.task_id;
      const foundTask = await this.taskRepository.findOne({ where: { task_id }, include: [Category], attributes: { exclude: ['category_id'] } });

      if (!foundTask) {
        throw new HttpException('Задача не найдена!', HttpStatus.NOT_FOUND);
      }

      var foundCategory;
      if (updatedTask.category_id != undefined) {
        const category_id = updatedTask.category_id;
        foundCategory = await this.categoryRepository.findOne({ where: { category_id } });

        if (!foundCategory) {
          throw new HttpException('Категория не найдена!', HttpStatus.BAD_REQUEST);
        }
      }

      result = await foundTask.update(updatedTask, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Изменена задача #${result.organization_type_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return result;
  }

  async remove(task_id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const foundObject = await this.taskRepository.findOne({ where: { task_id } });
      if (!foundObject) {
        throw new HttpException('Задача не найдена!', HttpStatus.NOT_FOUND);
      }

      await this.taskRepository.destroy({ where: { task_id }, transaction: trx }).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Удалена задача #${task_id}`,
      }
      await this.historyService.create(historyDto);;
    });
    return { statusCode: 200, message: 'Строка успешно удалена!' };
  }
}
