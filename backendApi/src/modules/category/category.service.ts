import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryRepository: typeof Category,) { }

  async create(category: CreateCategoryDto) {
    var newObject = await this.categoryRepository.create(category);
    return newObject;
  }

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async findOne(category_id: number) {
    const result = await this.categoryRepository.findOne({ where: { category_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Категория не найдена!'
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedCategory: UpdateCategoryDto) {
    const category_id = updatedCategory.category_id;
    const foundObject = await this.categoryRepository.findOne({ where: { category_id } });

    if (foundObject == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Категория не найдена!'
        }
      )
    }

    await foundObject.update(updatedCategory);

    return updatedCategory;
  }

  async remove(category_id: number) {
    const foundObject = await this.categoryRepository.findOne({ where: { category_id } });

    if (foundObject == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Категория не найдена!'
        }
      )
    } else {
      await this.categoryRepository.destroy({ where: { category_id } });
      return { statusCode: 200, message: 'Строка успешно удалена!' };
    }
  }
}
