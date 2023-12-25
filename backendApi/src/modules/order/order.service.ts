import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from 'src/modules/person/entities/person.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { Facility } from 'src/modules/facility/entities/facility.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { OrderStatus } from 'src/modules/order_status/entities/order_status.entity';
import { OrderPriority } from 'src/modules/priority/entities/priority.entity';
import { Order } from './entities/order.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';
import { OrderResponse, StatusOrderResponse } from './response';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    private readonly historyService: TransactionHistoryService,
  ) { }

  async create(createOrderDto: CreateOrderDto, user_id: number): Promise<OrderResponse> {
    try {
      const newOrder = await this.orderRepository.create(createOrderDto);

      const historyDto = {
        "user_id": user_id,
        "comment": `Создан заказ #${newOrder.order_id}`,
      }
      await this.historyService.create(historyDto);

      return newOrder;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<OrderResponse[]> {
    try {
      const result = await this.orderRepository.findAll({
        include: [Task, Facility, Organization, OrderStatus, OrderPriority],
        attributes: {
          exclude: [
            "task_id",
            "facility_id",
            "organization_id",
            "status_id",
            "priority_id"
          ]
        }
      })
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<boolean> {
    const result = await this.orderRepository.findOne({ where: { order_id: id } });

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async update(updateOrderDto: UpdateOrderDto, user_id: number): Promise<OrderResponse> {
    try {
      await this.orderRepository.update({ ...updateOrderDto }, { where: { order_id: updateOrderDto.order_id } });

      const foundOrder = await this.orderRepository.findOne({ where: { order_id: updateOrderDto.order_id } });

      if (foundOrder) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Изменен заказ #${foundOrder.order_id}`,
        }
        await this.historyService.create(historyDto);
      }

      return foundOrder;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(order_id: number, user_id: number): Promise<StatusOrderResponse> {
    try {
      const deleteOrder = await this.orderRepository.destroy({ where: { order_id } });

      if (deleteOrder) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Удален заказ #${order_id}`,
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
