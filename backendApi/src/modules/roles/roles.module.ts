import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Role, User])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule { }
