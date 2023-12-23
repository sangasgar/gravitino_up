import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from 'src/modules/person/entities/person.entity';
import { Group } from 'src/modules/group/entities/group.entity';
import { TransactionHistory } from '../transaction_history/entities/transaction_history.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { RolePermission } from '../roles_permissions/entities/roles_permission.entity';

@Module({
    imports: [SequelizeModule.forFeature([User, Role, Organization, Person, Group, TransactionHistory, RolePermission])],
    controllers: [UsersController],
    providers: [UsersService, TransactionHistoryService],
    exports: [UsersService],
})
export class UsersModule { }
