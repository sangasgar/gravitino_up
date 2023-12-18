import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { FileType } from 'src/file_type/entities/file_type.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Report } from './entities/report.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report) private reportRepository: typeof Report,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(FileType) private fileTypeRepository: typeof FileType,
  ) { }

  async create(createReportDto: CreateReportDto) {
    const user_id = createReportDto.report_user_id;
    const user = await this.userRepository.findOne({ where: { user_id: user_id } })

    if (!user) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Пользователь не найден!'
        }
      )
    }

    const file_type_id = createReportDto.file_type_id;
    const file_type = await this.fileTypeRepository.findOne({ where: { file_type_id: file_type_id } })

    if (!file_type) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Тип файла не найден!'
        }
      )
    }

    var result = await this.reportRepository.create(createReportDto).catch((error) => {
      let errorMessage = error.message;
      let errorCode = HttpStatus.BAD_REQUEST;

      throw new HttpException(errorMessage, errorCode);
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

  async update(updateReportDto: UpdateReportDto) {
    const report = await this.reportRepository.findOne({ where: { report_id: updateReportDto.report_id } })

    if (!report) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Отчет не найден!'
        }
      )
    }

    const user_id = updateReportDto.report_user_id;

    if (user_id != undefined) {
      const user = await this.userRepository.findOne({ where: { user_id: user_id } })

      if (!user) {
        return Promise.reject(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Пользователь не найден!'
          }
        )
      }
    }

    const file_type_id = updateReportDto.file_type_id;

    if (file_type_id != undefined) {
      const file_type = await this.fileTypeRepository.findOne({ where: { file_type_id: file_type_id } })

      if (!file_type) {
        return Promise.reject(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Тип файла не найден!'
          }
        )
      }
    }

    var result = await report.update(updateReportDto).catch((error) => {
      let errorMessage = error.message;
      let errorCode = HttpStatus.BAD_REQUEST;

      throw new HttpException(errorMessage, errorCode);
    });;

    return result;
  }

  async remove(id: number) {
    await this.reportRepository.destroy({ where: { report_id: id } })

    return "Запись удалена!"
  }
}
