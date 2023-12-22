import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { CategoryController } from './category.controller';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { TransactionHistory } from '../transaction_history/entities/transaction_history.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Category, TransactionHistory, User])],
  controllers: [CategoryController],
  providers: [CategoryService, TransactionHistoryService],
})
export class CategoryModule { }
