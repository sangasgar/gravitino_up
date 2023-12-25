import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';
import { TaskModule } from '../task/task.module';
import { FacilityModule } from '../facility/facility.module';
import { OrganizationModule } from '../organization/organization.module';
import { UsersModule } from '../users/users.module';
import { OrderStatusModule } from '../order_status/order_status.module';
import { PriorityModule } from '../priority/priority.module';

@Module({
  imports: [SequelizeModule.forFeature([Order]), TaskModule, FacilityModule, OrganizationModule, UsersModule, OrderStatusModule, PriorityModule, TransactionHistoryModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
