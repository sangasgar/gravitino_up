import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderPriority } from './entities/priority.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { Sequelize } from 'sequelize-typescript';
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';

@Injectable()
export class PriorityService {
  constructor(
    @InjectModel(OrderPriority) private orderPriorityRepository: typeof OrderPriority,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(createPriorityDto: CreatePriorityDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      result = await this.orderPriorityRepository.create(createPriorityDto, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Создан приоритет #${result.priority_id}`,
      }
      await this.historyService.create(historyDto);;
    })

    return result;
  }

  async findAll() {
    const result = await this.orderPriorityRepository.findAll({})

    return result;
  }

  async findOne(id: number) {
    const result = await this.orderPriorityRepository.findOne({ where: { priority_id: id } })

    return result;
  }

  async update(updatePriorityDto: UpdatePriorityDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const orderPriority = await this.orderPriorityRepository.findOne({ where: { priority_id: updatePriorityDto.priority_id } })
      if (!orderPriority) {
        throw new HttpException(AppError.PRIORITY_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      result = await orderPriority.update(updatePriorityDto, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Изменен приоритет #${result.priority_id}`,
      }
      await this.historyService.create(historyDto);;
    })

    return result
  }

  async remove(id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const orderPriority = await this.orderPriorityRepository.findOne({ where: { priority_id: id } })
      if (!orderPriority) {
        throw new HttpException(AppError.PRIORITY_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      await this.orderPriorityRepository.destroy({ where: { priority_id: id }, transaction: trx }).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Удален приоритет #${id}`,
      }
      await this.historyService.create(historyDto);
    })

    return { statusCode: 200, message: AppStrings.SUCCESS_ROW_DELETE };
  }
}
