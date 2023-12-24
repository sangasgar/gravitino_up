import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './entities/group.entity';
import { UsersModule } from '../users/users.module';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';

@Module({
  imports: [SequelizeModule.forFeature([Group]), UsersModule, TransactionHistoryModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule { }
