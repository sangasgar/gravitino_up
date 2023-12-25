import { Module } from '@nestjs/common';
import { TransactionHistoryService } from './transaction_history.service';
import { TransactionHistoryController } from './transaction_history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { TransactionHistory } from './entities/transaction_history.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { Person } from '../person/entities/person.entity';
import { Role } from '../roles/entities/role.entity';
import { RolePermission } from '../roles_permissions/entities/roles_permission.entity';
import { Group } from '../group/entities/group.entity';
import { Organization } from '../organization/entities/organization.entity';

@Module({
  imports: [SequelizeModule.forFeature([TransactionHistory, User, Person, Role, RolePermission, Group, Organization])],
  controllers: [TransactionHistoryController],
  providers: [TransactionHistoryService, UsersService],
  exports: [TransactionHistoryService],
})
export class TransactionHistoryModule { }
