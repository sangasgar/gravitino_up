import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderStatusDto, UpdateOrderStatusDto } from './dto';
import { OrderStatus } from './entities/order_status.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { OrderStatusResponse, StatusOrderStatusResponse } from './response';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectModel(OrderStatus) private orderStatusRepository: typeof OrderStatus,
    private readonly historyService: TransactionHistoryService,
  ) { }

  async create(orderStatus: CreateOrderStatusDto, user_id: number): Promise<OrderStatusResponse> {
    try {
      const newOrderStatus = await this.orderStatusRepository.create(orderStatus);

      const historyDto = {
        "user_id": user_id,
        "comment": `Создан статус заказа #${newOrderStatus.status_id}`,
      }
      await this.historyService.create(historyDto);

      return newOrderStatus;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<OrderStatusResponse[]> {
    try {
      const foundStatuses = await this.orderStatusRepository.findAll();
      return foundStatuses;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(status_id: number): Promise<boolean> {
    try {
      const result = await this.orderStatusRepository.findOne({ where: { status_id } });

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(updatedOrderStatus: UpdateOrderStatusDto, user_id: number): Promise<OrderStatusResponse> {
    try {
      await this.orderStatusRepository.update({ ...updatedOrderStatus }, { where: { status_id: updatedOrderStatus.status_id } });

      const foundOrderStatus = await this.orderStatusRepository.findOne({ where: { status_id: updatedOrderStatus.status_id } });

      if (foundOrderStatus) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Изменен статус заказа #${foundOrderStatus.status_id}`,
        }
        await this.historyService.create(historyDto);
      }

      return foundOrderStatus;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(status_id: number, user_id: number): Promise<StatusOrderStatusResponse> {
    try {
      const deleteOrderStatus = await this.orderStatusRepository.destroy({ where: { status_id } });

      if (deleteOrderStatus) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Удален статус заказа #${status_id}`,
        }
        await this.historyService.create(historyDto);

        return { status: true };
      }

      return { status: false };
    } catch (error) {
      throw new Error(error);
    }
  }
}
