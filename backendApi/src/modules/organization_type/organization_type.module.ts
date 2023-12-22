import { Module } from '@nestjs/common';
import { OrganizationTypeService } from './organization_type.service';
import { OrganizationTypeController } from './organization_type.controller';
import { OrganizationType } from './entities/organization_type.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionHistory } from '../transaction_history/entities/transaction_history.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([OrganizationType, User, TransactionHistory])],
  controllers: [OrganizationTypeController],
  providers: [OrganizationTypeService, TransactionHistoryService],
})
export class OrganizationTypeModule { }
