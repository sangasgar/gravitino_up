import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
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

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Task) private taskRepository: typeof Task,
    @InjectModel(Facility) private facilityRepository: typeof Facility,
    @InjectModel(Organization) private organizationRepository: typeof Organization,
    @InjectModel(OrderStatus) private orderStatusRepository: typeof OrderStatus,
    @InjectModel(OrderPriority) private orderPriorityRepository: typeof OrderPriority,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(createOrderDto: CreateOrderDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const task_id = createOrderDto.task_id
      const task = await this.taskRepository.findOne({ where: { task_id } })

      if (!task) {
        throw new HttpException(AppError.TASK_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      const facility_id = createOrderDto.facility_id
      const facility = await this.facilityRepository.findOne({ where: { facility_id } })

      if (!facility) {
        throw new HttpException(AppError.FACILITY_NOT_FOUND, HttpStatus.BAD_REQUEST)
      }

      const organization_id = createOrderDto.organization_id
      const organization = await this.organizationRepository.findOne({ where: { organization_id } })

      if (!organization) {
        throw new HttpException(AppError.ORGANIZATION_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      const executor_id = createOrderDto.executor_id
      const executor = await this.userRepository.findOne({ where: { user_id: executor_id } })

      if (!executor) {
        throw new HttpException(AppError.USER_EXECUTOR_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      const creator_id = createOrderDto.creator_id
      const creator = await this.userRepository.findOne({ where: { user_id: creator_id } })

      if (!creator) {
        throw new HttpException(AppError.USER_CREATOR_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      const status_id = createOrderDto.status_id
      const status = await this.orderStatusRepository.findOne({ where: { status_id } })

      if (!status) {
        throw new HttpException(AppError.ORDER_STATUS_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      const priority_id = createOrderDto.priority_id
      const priority = await this.orderPriorityRepository.findOne({ where: { priority_id } })

      if (!priority) {
        throw new HttpException(AppError.PRIORITY_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      result = await this.orderRepository.create(createOrderDto, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      })

      const historyDto = {
        "user_id": user_id,
        "comment": `Создан зазказ #${result.order_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return result
  }

  async findAll() {
    const result = await this.orderRepository.findAll({
      include: [Task, Facility, Organization, "executor", "creator", OrderStatus, OrderPriority],
      attributes: {
        exclude: [
          "task_id",
          "facility_id",
          "organization_id",
          "executor_id",
          "creator_id",
          "status_id",
          "priority_id"
        ]
      }
    })

    return result;
  }

  async findOne(id: number) {
    const result = await this.orderRepository.findOne({
      where: { order_id: id },
      include: [Task, Facility, Organization, OrderStatus, OrderPriority],
      attributes: {
        exclude: [
          "task_id",
          "facility_id",
          "organization_id",
          "status_id",
          "priority_id",
        ],
      },
    })

    if (result == null) {
      throw new HttpException(AppError.ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return result;
  }

  async update(updateOrderDto: UpdateOrderDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const order = await this.orderRepository.findOne({ where: { order_id: updateOrderDto.order_id } })
      if (!order) {
        throw new HttpException(AppError.ORDER_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      if (updateOrderDto.task_id != undefined) {
        const task_id = updateOrderDto.task_id
        const task = await this.taskRepository.findOne({ where: { task_id } })

        if (!task) {
          throw new HttpException(AppError.TASK_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
      }

      if (updateOrderDto.facility_id != undefined) {
        const facility_id = updateOrderDto.facility_id
        const facility = await this.facilityRepository.findOne({ where: { facility_id } })

        if (!facility) {
          throw new HttpException(AppError.FACILITY_NOT_FOUND, HttpStatus.BAD_REQUEST)
        }
      }

      if (updateOrderDto.organization_id != undefined) {
        const organization_id = updateOrderDto.organization_id
        const organization = await this.organizationRepository.findOne({ where: { organization_id } })

        if (!organization) {
          throw new HttpException(AppError.ORGANIZATION_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
      }

      if (updateOrderDto.executor_id != undefined) {
        const executor_id = updateOrderDto.executor_id
        const executor = await this.userRepository.findOne({ where: { user_id: executor_id } })

        if (!executor) {
          throw new HttpException(AppError.USER_EXECUTOR_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
      }

      if (updateOrderDto.creator_id != undefined) {
        const creator_id = updateOrderDto.creator_id
        const creator = await this.userRepository.findOne({ where: { user_id: creator_id } })

        if (!creator) {
          throw new HttpException(AppError.USER_CREATOR_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
      }

      if (updateOrderDto.status_id != undefined) {
        const status_id = updateOrderDto.status_id
        const status = await this.orderStatusRepository.findOne({ where: { status_id } })

        if (!status) {
          throw new HttpException(AppError.ORDER_STATUS_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
      }

      if (updateOrderDto.priority_id != undefined) {
        const priority_id = updateOrderDto.priority_id
        const priority = await this.orderPriorityRepository.findOne({ where: { priority_id } })

        if (!priority) {
          throw new HttpException(AppError.PRIORITY_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
      }

      result = await order.update(updateOrderDto, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      })

      const historyDto = {
        "user_id": user_id,
        "comment": `Изменен заказ #${result.order_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return result
  }

  async remove(id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const result = await this.orderRepository.findOne({ where: { order_id: id } });

      if (!result) {
        throw new HttpException(AppError.ORDER_NOT_FOUND, HttpStatus.BAD_REQUEST)
      }

      await this.orderRepository.destroy({ where: { order_id: id }, transaction: trx }).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Удалена группа #${result.order_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return { statusCode: 200, message: AppStrings.SUCCESS_ROW_DELETE };
  }
}
