import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './entities/group.entity';
import { TransactionHistory } from '../transaction_history/entities/transaction_history.entity';
import { User } from '../users/entities/user.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';

@Module({
  imports: [SequelizeModule.forFeature([Group, User, TransactionHistory])],
  controllers: [GroupController],
  providers: [GroupService, TransactionHistoryService],
})
export class GroupModule { }
