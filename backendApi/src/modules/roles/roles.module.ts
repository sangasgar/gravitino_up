import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';

@Module({
  imports: [SequelizeModule.forFeature([Role]), TransactionHistoryModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule { }
