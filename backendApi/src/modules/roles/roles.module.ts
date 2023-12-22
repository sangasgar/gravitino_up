import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { RolePermission } from '../roles_permissions/entities/roles_permission.entity';
import { TransactionHistory } from '../transaction_history/entities/transaction_history.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, RolePermission, TransactionHistory])],
  controllers: [RolesController],
  providers: [RolesService, TransactionHistoryService],
})
export class RolesModule { }
