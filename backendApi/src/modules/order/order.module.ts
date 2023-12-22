import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { Facility } from 'src/modules/facility/entities/facility.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { OrderStatus } from 'src/modules/order_status/entities/order_status.entity';
import { OrderPriority } from 'src/modules/priority/entities/priority.entity';
import { TransactionHistory } from '../transaction_history/entities/transaction_history.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';

@Module({
  imports: [SequelizeModule.forFeature([Order, Task, Facility, Organization, User, OrderStatus, OrderPriority, TransactionHistory])],
  controllers: [OrderController],
  providers: [OrderService, TransactionHistoryService],
})
export class OrderModule { }
