import { Module } from '@nestjs/common';
import { RolesPermissionsService } from './roles_permissions.service';
import { RolesPermissionsController } from './roles_permissions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from '../permissions/entities/permission.entity';
import { RolePermission } from './entities/roles_permission.entity';
import { Role } from '../roles/entities/role.entity';
import { TransactionHistory } from '../transaction_history/entities/transaction_history.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Permission, User, TransactionHistory, RolePermission, Role])],
  controllers: [RolesPermissionsController],
  providers: [RolesPermissionsService, TransactionHistoryService],
  exports: [RolesPermissionsService],
})
export class RolesPermissionsModule { }
