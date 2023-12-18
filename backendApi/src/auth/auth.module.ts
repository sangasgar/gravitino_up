import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';
import { Auth } from './entities/auth.entity';
import { UsersService } from 'src/users/users.service';
import { Person } from 'src/person/entities/person.entity';
import { Group } from 'src/group/entities/group.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Role } from 'src/roles/entities/role.entity';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, Organization, Person, Group, Auth,])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
})
export class AuthModule { }
