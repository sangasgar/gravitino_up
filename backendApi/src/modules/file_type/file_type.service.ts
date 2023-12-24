import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateFileTypeDto, UpdateFileTypeDto } from './dto';
import { FileType } from './entities/file_type.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { Sequelize } from 'sequelize-typescript';
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';
import { FileTypeResponse, StatusFileTypeResponse } from './response';

@Injectable()
export class FileTypeService {
  constructor(
    @InjectModel(FileType) private fileTypeRepository: typeof FileType,
    private readonly historyService: TransactionHistoryService,
  ) { }

  async create(fileType: CreateFileTypeDto, user_id: number): Promise<FileTypeResponse> {
    try {
      const newFileType = await this.fileTypeRepository.create(fileType);

      const historyDto = {
        "user_id": user_id,
        "comment": `Создана тип файла #${newFileType.file_type_id}`,
      }
      await this.historyService.create(historyDto);

      return newFileType;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<FileTypeResponse[]> {
    try {
      const result = await this.fileTypeRepository.findAll();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(file_type_id: number): Promise<boolean> {
    try {
      const foundFileType = await this.fileTypeRepository.findOne({ where: { file_type_id } });
      if (foundFileType) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(updatedFile: UpdateFileTypeDto, user_id: number): Promise<FileTypeResponse> {
    try {
      let foundFileType = null;
      await this.fileTypeRepository.update({ ...updatedFile }, { where: { file_type_id: updatedFile.file_type_id } });

      foundFileType = await this.fileTypeRepository.findOne({ where: { file_type_id: updatedFile.file_type_id } });

      if (foundFileType) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Изменен тип файла #${foundFileType.file_type_id}`,
        }
        await this.historyService.create(historyDto);
      }

      return foundFileType;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(file_type_id: number, user_id: number): Promise<StatusFileTypeResponse> {
    const deleteFileType = await this.fileTypeRepository.destroy({ where: { file_type_id } });

    if (deleteFileType) {
      const historyDto = {
        "user_id": user_id,
        "comment": `Удален тип файла #${file_type_id}`,
      }
      await this.historyService.create(historyDto);

      return { status: true };
    }

    return { status: false };
  }
}
