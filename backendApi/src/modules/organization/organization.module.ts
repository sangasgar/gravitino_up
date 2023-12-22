import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { Organization } from './entities/organization.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { OrganizationType } from 'src/modules/organization_type/entities/organization_type.entity';
import { TransactionHistory } from '../transaction_history/entities/transaction_history.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';

@Module({
  imports: [SequelizeModule.forFeature([Organization, User, OrganizationType, TransactionHistory])],
  controllers: [OrganizationController],
  providers: [OrganizationService, TransactionHistoryService],
})
export class OrganizationModule { }
