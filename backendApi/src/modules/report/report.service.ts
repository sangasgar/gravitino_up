import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { FileType } from 'src/modules/file_type/entities/file_type.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Report } from './entities/report.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report) private reportRepository: typeof Report,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(FileType) private fileTypeRepository: typeof FileType,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(createReportDto: CreateReportDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const user = await this.userRepository.findOne({ where: { user_id: createReportDto.report_user_id } })
      if (!user) {
        throw new HttpException('Пользователь не найден!', HttpStatus.BAD_REQUEST);
      }

      const file_type = await this.fileTypeRepository.findOne({ where: { file_type_id: createReportDto.file_type_id } })
      if (!file_type) {
        throw new HttpException('Тип файла не найден!', HttpStatus.BAD_REQUEST);
      }

      result = await this.reportRepository.create(createReportDto, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Создан отчет #${result.report_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return result;
  }

  async findAll() {
    const result = await this.reportRepository.findAll({})

    return result;
  }

  async findOne(id: number) {
    const result = await this.reportRepository.findOne({ where: { report_id: id } })

    return result;
  }

  async update(updateReportDto: UpdateReportDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const report = await this.reportRepository.findOne({ where: { report_id: updateReportDto.report_id } })
      if (!report) {
        throw new HttpException('Отчет не найден!', HttpStatus.BAD_REQUEST);
      }

      if (updateReportDto.report_user_id != undefined) {
        const user = await this.userRepository.findOne({ where: { user_id: updateReportDto.report_user_id } })
        if (!user) {
          throw new HttpException('Пользователь не найден!', HttpStatus.BAD_REQUEST);
        }
      }

      if (updateReportDto.file_type_id != undefined) {
        const file_type = await this.fileTypeRepository.findOne({ where: { file_type_id: updateReportDto.file_type_id } })
        if (!file_type) {
          throw new HttpException('Тип файла не найден!', HttpStatus.BAD_REQUEST);
        }
      }

      result = await report.update(updateReportDto, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Изменен отчет #${result.report_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return result;
  }

  async remove(id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const result = await this.reportRepository.findOne({ where: { report_id: id } });
      if (result == null) {
        throw new HttpException('Отчет не найден!', HttpStatus.BAD_REQUEST);
      }

      await this.reportRepository.destroy({ where: { report_id: id }, transaction: trx }).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Удален отчет #${id}`,
      }
      await this.historyService.create(historyDto);
    });

    return { statusCode: 200, message: 'Строка успешно удалена!' };
  }
}
