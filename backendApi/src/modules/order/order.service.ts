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
    private sequelize: Sequelize,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const task_id = createOrderDto.task_id
    const task = await this.taskRepository.findOne({ where: { task_id } })

    if (!task) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Задача не найдена!'
        }
      )
    }

    const facility_id = createOrderDto.facility_id
    const facility = await this.facilityRepository.findOne({ where: { facility_id } })

    if (!facility) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Объект обслуживания не найден!'
        }
      )
    }

    const organization_id = createOrderDto.organization_id
    const organization = await this.organizationRepository.findOne({ where: { organization_id } })

    if (!organization) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Организация не найдена!'
        }
      )
    }

    const executor_id = createOrderDto.executor_id
    const executor = await this.userRepository.findOne({ where: { user_id: executor_id } })

    if (!executor) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Пользователь (исполнитель) не найден!'
        }
      )
    }

    const creator_id = createOrderDto.creator_id
    const creator = await this.userRepository.findOne({ where: { user_id: creator_id } })

    if (!creator) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Пользователь (создатель) не найден!'
        }
      )
    }

    const status_id = createOrderDto.status_id
    const status = await this.orderStatusRepository.findOne({ where: { status_id } })

    if (!status) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Статус не найден!'
        }
      )
    }

    const priority_id = createOrderDto.priority_id
    const priority = await this.orderPriorityRepository.findOne({ where: { priority_id } })

    if (!priority) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Приоритет не найден!'
        }
      )
    }

    const result = await this.orderRepository.create(createOrderDto).catch((error) => {
      let errorMessage = error.message;
      let errorCode = HttpStatus.BAD_REQUEST;

      throw new HttpException(errorMessage, errorCode);
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

    return result;
  }

  async update(updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ where: { order_id: updateOrderDto.order_id } })
    if (!order) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Заказ не найден!'
        }
      )
    }

    if (updateOrderDto.task_id != undefined) {
      const task_id = updateOrderDto.task_id
      const task = await this.taskRepository.findOne({ where: { task_id } })

      if (!task) {
        return Promise.reject(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Задача не найдена!'
          }
        )
      }
    }

    if (updateOrderDto.facility_id != undefined) {
      const facility_id = updateOrderDto.facility_id
      const facility = await this.facilityRepository.findOne({ where: { facility_id } })

      if (!facility) {
        return Promise.reject(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Объект обслуживания не найден!'
          }
        )
      }
    }

    if (updateOrderDto.organization_id != undefined) {
      const organization_id = updateOrderDto.organization_id
      const organization = await this.organizationRepository.findOne({ where: { organization_id } })

      if (!organization) {
        return Promise.reject(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Организация не найдена!'
          }
        )
      }
    }

    if (updateOrderDto.executor_id != undefined) {
      const executor_id = updateOrderDto.executor_id
      const executor = await this.userRepository.findOne({ where: { user_id: executor_id } })

      if (!executor) {
        return Promise.reject(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Пользователь (исполнитель) не найден!'
          }
        )
      }
    }

    if (updateOrderDto.creator_id != undefined) {
      const creator_id = updateOrderDto.creator_id
      const creator = await this.userRepository.findOne({ where: { user_id: creator_id } })

      if (!creator) {
        return Promise.reject(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Пользователь (создатель) не найден!'
          }
        )
      }
    }

    if (updateOrderDto.status_id != undefined) {
      const status_id = updateOrderDto.status_id
      const status = await this.orderStatusRepository.findOne({ where: { status_id } })

      if (!status) {
        return Promise.reject(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Статус не найден!'
          }
        )
      }
    }

    if (updateOrderDto.priority_id != undefined) {
      const priority_id = updateOrderDto.priority_id
      const priority = await this.orderPriorityRepository.findOne({ where: { priority_id } })

      if (!priority) {
        return Promise.reject(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Приоритет не найден!'
          }
        )
      }
    }

    const result = await order.update(updateOrderDto).catch((error) => {
      let errorMessage = error.message;
      let errorCode = HttpStatus.BAD_REQUEST;

      throw new HttpException(errorMessage, errorCode);
    })

    return result
  }

  async remove(id: number) {
    await this.orderRepository.destroy({ where: { order_id: id } })
  }
}
