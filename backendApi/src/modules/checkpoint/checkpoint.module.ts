import { Module } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CheckpointController } from './checkpoint.controller';
import { Checkpoint } from './entities/checkpoint.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { TransactionHistory } from '../transaction_history/entities/transaction_history.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Checkpoint, Organization, TransactionHistory, User])],
  controllers: [CheckpointController],
  providers: [CheckpointService, TransactionHistoryService],
})
export class CheckpointModule { }
