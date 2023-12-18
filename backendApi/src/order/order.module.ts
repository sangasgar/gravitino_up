import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { Task } from 'src/task/entities/task.entity';
import { Facility } from 'src/facility/entities/facility.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderStatus } from 'src/order_status/entities/order_status.entity';
import { OrderPriority } from 'src/priority/entities/priority.entity';

@Module({
  imports: [SequelizeModule.forFeature([Order, Task, Facility, Organization, User, OrderStatus, OrderPriority])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
