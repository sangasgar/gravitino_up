import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from './entities/permission.entity';
import { User } from '../users/entities/user.entity';
import { TransactionHistory } from '../transaction_history/entities/transaction_history.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { RolesPermissionsService } from '../roles_permissions/roles_permissions.service';
import { RolePermission } from '../roles_permissions/entities/roles_permission.entity';
import { Role } from '../roles/entities/role.entity';

@Module({
  imports: [SequelizeModule.forFeature([Permission, User, TransactionHistory, RolePermission, Role])],
  controllers: [PermissionsController],
  providers: [PermissionsService, RolesPermissionsService, TransactionHistoryService],
})
export class PermissionsModule { }
