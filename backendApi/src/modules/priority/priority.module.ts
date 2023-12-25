import { Module } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { PriorityController } from './priority.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderPriority } from './entities/priority.entity';
import { UsersModule } from '../users/users.module';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';

@Module({
  imports: [SequelizeModule.forFeature([OrderPriority]), UsersModule, TransactionHistoryModule],
  controllers: [PriorityController],
  providers: [PriorityService],
  exports: [PriorityService],
})
export class PriorityModule { }
