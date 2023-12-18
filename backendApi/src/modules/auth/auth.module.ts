import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { Auth } from './entities/auth.entity';
import { UsersService } from 'src/modules/users/users.service';
import { Person } from 'src/modules/person/entities/person.entity';
import { Group } from 'src/modules/group/entities/group.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { JwtStrategy } from 'src/modules/strategies/jwt.strategy';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, Organization, Person, Group, Auth,])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
})
export class AuthModule { }
