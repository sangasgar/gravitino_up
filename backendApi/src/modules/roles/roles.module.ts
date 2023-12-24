import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { RolePermission } from '../roles_permissions/entities/roles_permission.entity';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, RolePermission]), TransactionHistoryModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule { }
