import { Module } from '@nestjs/common';
import { RolesPermissionsService } from './roles_permissions.service';
import { RolesPermissionsController } from './roles_permissions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolePermission } from './entities/roles_permission.entity';
import { PermissionsModule } from '../permissions/permissions.module';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [SequelizeModule.forFeature([RolePermission]), RolesModule, PermissionsModule, UsersModule, TransactionHistoryModule],
  controllers: [RolesPermissionsController],
  providers: [RolesPermissionsService],
  exports: [RolesPermissionsService],
})
export class RolesPermissionsModule { }
