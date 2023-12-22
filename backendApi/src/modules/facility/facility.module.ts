import { Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Facility } from './entities/facility.entity';
import { Checkpoint } from 'src/modules/checkpoint/entities/checkpoint.entity';
import { TransactionHistory } from '../transaction_history/entities/transaction_history.entity';
import { User } from '../users/entities/user.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';

@Module({
  imports: [SequelizeModule.forFeature([Facility, Checkpoint, TransactionHistory, User])],
  controllers: [FacilityController],
  providers: [FacilityService, TransactionHistoryService],
})
export class FacilityModule { }
