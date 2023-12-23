import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { UpdateOrderStatusDto } from './dto/update-order_status.dto';
import { OrderStatus } from './entities/order_status.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { Sequelize } from 'sequelize-typescript';
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectModel(OrderStatus) private orderStatusRepository: typeof OrderStatus,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(orderStatus: CreateOrderStatusDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      result = await this.orderStatusRepository.create(orderStatus, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Создан статус заказа #${result.status_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return result;
  }

  async findAll() {
    return await this.orderStatusRepository.findAll();
  }

  async findOne(status_id: number) {
    const result = await this.orderStatusRepository.findOne({ where: { status_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: AppError.ORDER_STATUS_NOT_FOUND
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedOrderStatus: UpdateOrderStatusDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };
      const foundStatus = await this.orderStatusRepository.findOne({ where: { status_id: updatedOrderStatus.status_id } });

      if (foundStatus == null) {
        throw new HttpException(AppError.ORDER_STATUS_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      result = await foundStatus.update(updatedOrderStatus, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Изменен статус заказа #${result.status_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return result;
  }

  async remove(status_id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const result = await this.orderStatusRepository.findOne({ where: { status_id } });
      if (result == null) {
        throw new HttpException(AppError.ORDER_STATUS_NOT_FOUND, HttpStatus.NOT_FOUND)
      }

      await this.orderStatusRepository.destroy({ where: { status_id }, transaction: trx }).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Удален статус заказа #${status_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return { statusCode: 200, message: AppStrings.SUCCESS_ROW_DELETE };
  }
}
