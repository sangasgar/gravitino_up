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
import { RolePermission } from '../roles_permissions/entities/roles_permission.entity';
import { PersonModule } from '../person/person.module';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';

@Module({
    imports: [SequelizeModule.forFeature([User, Role, Organization, Group, RolePermission, Person]), TransactionHistoryModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
