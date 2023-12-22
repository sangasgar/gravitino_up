import { Module } from '@nestjs/common';
import { TransactionHistoryService } from './transaction_history.service';
import { TransactionHistoryController } from './transaction_history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { TransactionHistory } from './entities/transaction_history.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, TransactionHistory])],
  controllers: [TransactionHistoryController],
  providers: [TransactionHistoryService],
  exports: [TransactionHistoryService],
})
export class TransactionHistoryModule { }
