import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from 'src/modules/person/entities/person.entity';
import { Group } from 'src/modules/group/entities/group.entity';

@Module({
    imports: [SequelizeModule.forFeature([User, Role, Organization, Person, Group])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
