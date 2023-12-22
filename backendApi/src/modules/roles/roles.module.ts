import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { RolePermission } from '../roles_permissions/entities/roles_permission.entity';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, RolePermission])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule { }
