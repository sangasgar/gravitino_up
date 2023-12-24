import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { CategoryResponse, StatusCategoryResponse } from './response';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
    private readonly historyService: TransactionHistoryService,
  ) { }

  async create(category: CreateCategoryDto, user_id: number): Promise<CategoryResponse> {
    try {
      const newCategory = await this.categoryRepository.create(category);

      const historyDto = {
        "user_id": user_id,
        "comment": `Создана категория #${newCategory.category_id}`,
      }
      await this.historyService.create(historyDto);

      return newCategory;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<CategoryResponse[]> {
    try {
      const foundCategories = await this.categoryRepository.findAll();
      return foundCategories;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(category_id: number): Promise<boolean> {
    try {
      const result = await this.categoryRepository.findOne({ where: { category_id } });

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }

  }

  async update(updatedCategory: UpdateCategoryDto, user_id: number): Promise<CategoryResponse> {
    try {
      let foundCategory = null;
      await this.categoryRepository.update({ ...updatedCategory }, { where: { category_id: updatedCategory.category_id } });

      foundCategory = await this.categoryRepository.findOne({ where: { category_id: updatedCategory.category_id } });

      if (foundCategory) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Изменена категория #${foundCategory.category_id}`,
        }
        await this.historyService.create(historyDto);
      }

      return foundCategory;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(category_id: number, user_id: number): Promise<StatusCategoryResponse> {
    const deleteCategory = await this.categoryRepository.destroy({ where: { category_id } });

    if (deleteCategory) {
      const historyDto = {
        "user_id": user_id,
        "comment": `Удалена категория #${category_id}`,
      }
      await this.historyService.create(historyDto);

      return { status: true };
    }

    return { status: false };
  }
}
