import { Module } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { PriorityController } from './priority.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderPriority } from './entities/priority.entity';
import { User } from '../users/entities/user.entity';
import { TransactionHistory } from '../transaction_history/entities/transaction_history.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';

@Module({
  imports: [SequelizeModule.forFeature([OrderPriority, User, TransactionHistory])],
  controllers: [PriorityController],
  providers: [PriorityService, TransactionHistoryService],
})
export class PriorityModule { }
