import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { Sequelize } from 'sequelize-typescript';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(category: CreateCategoryDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      result = await this.categoryRepository.create(category, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Создана категория #${result.category_id}`,
      }
      await this.historyService.create(historyDto);
    })
    return result;
  }

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async findOne(category_id: number) {
    const result = await this.categoryRepository.findOne({ where: { category_id } });

    if (result == null) {
      throw new HttpException('Категория не найдена!', HttpStatus.BAD_REQUEST);
    } else {
      return result;
    }
  }

  async update(updatedCategory: UpdateCategoryDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const category_id = updatedCategory.category_id;
      const foundObject = await this.categoryRepository.findOne({ where: { category_id } });

      if (foundObject == null) {
        throw new HttpException('Категория не найдена!', HttpStatus.NOT_FOUND);
      }

      result = await foundObject.update(updatedCategory, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Изменена категория #${result.category_id}`,
      }
      await this.historyService.create(historyDto);
    });


    return result;
  }

  async remove(category_id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const foundObject = await this.categoryRepository.findOne({ where: { category_id } });

      if (foundObject == null) {
        throw new HttpException('Категория не найдена!', HttpStatus.NOT_FOUND);
      }

      await this.categoryRepository.destroy({ where: { category_id }, transaction: trx });

      const historyDto = {
        "user_id": user_id,
        "comment": `Удалена категория #${category_id}`,
      }
      await this.historyService.create(historyDto);

      return { statusCode: 200, message: 'Строка успешно удалена!' };
    });
  }
}
