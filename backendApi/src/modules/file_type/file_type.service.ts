import { Inject, Injectable } from '@nestjs/common';
import { CreateFileTypeDto } from './dto/create-file_type.dto';
import { UpdateFileTypeDto } from './dto/update-file_type.dto';
import { FileType } from './entities/file_type.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class FileTypeService {
  constructor(@InjectModel(FileType) private fileTypeRepository: typeof FileType,) { }

  async create(fileType: CreateFileTypeDto) {
    var newFileType = await this.fileTypeRepository.create(fileType);

    return newFileType;
  }

  findAll() {
    return this.fileTypeRepository.findAll();
  }

  async findOne(file_type_id: number) {
    const result = await this.fileTypeRepository.findOne({ where: { file_type_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Тип файла не найден!'
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedFile: UpdateFileTypeDto) {
    const file_type_id = updatedFile.file_type_id;
    const foundFileType = await this.fileTypeRepository.findOne({ where: { file_type_id } });

    if (foundFileType == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Тип файла не найден!'
        }
      )
    }

    await foundFileType.update(updatedFile);

    return updatedFile;
  }

  async remove(file_type_id: number) {
    const result = await this.fileTypeRepository.findOne({ where: { file_type_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Тип файла не найден!'
        }
      )
    } else {
      await this.fileTypeRepository.destroy({ where: { file_type_id } });
      return { statusCode: 200, message: 'Строка успешно удалена!' };
    }
  }
}
