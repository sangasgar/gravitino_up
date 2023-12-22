import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateFileTypeDto } from './dto/create-file_type.dto';
import { UpdateFileTypeDto } from './dto/update-file_type.dto';
import { FileType } from './entities/file_type.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class FileTypeService {
  constructor(
    @InjectModel(FileType) private fileTypeRepository: typeof FileType,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(fileType: CreateFileTypeDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      result = await this.fileTypeRepository.create(fileType, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Создана тип файла #${result.file_type_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return result;
  }

  async findAll() {
    return await this.fileTypeRepository.findAll();
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

  async update(updatedFile: UpdateFileTypeDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const foundFileType = await this.fileTypeRepository.findOne({ where: { file_type_id: updatedFile.file_type_id } });

      if (foundFileType == null) {
        throw new HttpException('Тип файла не найден!', HttpStatus.BAD_REQUEST);
      }

      result = await foundFileType.update(updatedFile, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Изменен тип файла #${result.file_type_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return result;
  }

  async remove(file_type_id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const result = await this.fileTypeRepository.findOne({ where: { file_type_id } });

      if (result == null) {
        throw new HttpException('Тип файла не найден!', HttpStatus.BAD_REQUEST);
      }

      await this.fileTypeRepository.destroy({ where: { file_type_id }, transaction: trx }).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Удален тип файла #${file_type_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return { statusCode: 200, message: 'Строка успешно удалена!' };
  }
}
