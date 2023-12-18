import { Injectable } from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { UpdateOrderStatusDto } from './dto/update-order_status.dto';
import { OrderStatus } from './entities/order_status.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OrderStatusService {
  constructor(@InjectModel(OrderStatus) private orderStatusRepository: typeof OrderStatus,) { }

  async create(orderStatus: CreateOrderStatusDto) {
    var newOrderStatus = await this.orderStatusRepository.create(orderStatus);

    return newOrderStatus;
  }

  findAll() {
    return this.orderStatusRepository.findAll();
  }

  async findOne(status_id: number) {
    const result = await this.orderStatusRepository.findOne({ where: { status_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Статус заказа не найден!'
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedOrderStatus: UpdateOrderStatusDto) {
    const status_id = updatedOrderStatus.status_id;
    const foundStatus = await this.orderStatusRepository.findOne({ where: { status_id } });

    if (foundStatus == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Статус заказа не найден!'
        }
      )
    }

    await foundStatus.update(updatedOrderStatus);

    return updatedOrderStatus;
  }

  async remove(status_id: number) {
    const result = await this.orderStatusRepository.findOne({ where: { status_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Статус заказа не найден!'
        }
      )
    } else {
      await this.orderStatusRepository.destroy({ where: { status_id } });
      return { statusCode: 200, message: 'Строка успешно удалена!' };
    }
  }
}
