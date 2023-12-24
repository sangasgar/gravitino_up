import { Module } from '@nestjs/common';
import { OrderStatusService } from './order_status.service';
import { OrderStatusController } from './order_status.controller';
import { OrderStatus } from './entities/order_status.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { TransactionHistory } from '../transaction_history/entities/transaction_history.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([OrderStatus, TransactionHistory, User])],
  controllers: [OrderStatusController],
  providers: [OrderStatusService, TransactionHistoryService],
})
export class OrderStatusModule { }
