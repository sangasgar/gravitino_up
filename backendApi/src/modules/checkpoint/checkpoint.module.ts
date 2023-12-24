import { Module } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CheckpointController } from './checkpoint.controller';
import { Checkpoint } from './entities/checkpoint.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrganizationModule } from '../organization/organization.module';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';

@Module({
  imports: [SequelizeModule.forFeature([Checkpoint]), OrganizationModule, TransactionHistoryModule],
  controllers: [CheckpointController],
  providers: [CheckpointService],
  exports: [CheckpointService]
})
export class CheckpointModule { }
