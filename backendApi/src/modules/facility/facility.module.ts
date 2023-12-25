import { Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Facility } from './entities/facility.entity';
import { User } from '../users/entities/user.entity';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';
import { CheckpointModule } from '../checkpoint/checkpoint.module';

@Module({
  imports: [SequelizeModule.forFeature([Facility]), CheckpointModule, TransactionHistoryModule],
  controllers: [FacilityController],
  providers: [FacilityService],
  exports: [FacilityService],
})
export class FacilityModule { }
