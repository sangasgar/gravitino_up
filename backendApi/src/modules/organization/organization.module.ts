import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { Organization } from './entities/organization.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { OrganizationType } from 'src/modules/organization_type/entities/organization_type.entity';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';
import { OrganizationTypeModule } from '../organization_type/organization_type.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Organization]), TransactionHistoryModule, OrganizationTypeModule],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule { }
