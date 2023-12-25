import { Module } from '@nestjs/common';
import { OrderStatusService } from './order_status.service';
import { OrderStatusController } from './order_status.controller';
import { OrderStatus } from './entities/order_status.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';

@Module({
  imports: [SequelizeModule.forFeature([OrderStatus]), TransactionHistoryModule],
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
})
export class OrderStatusModule { }
