import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { Organization } from './entities/organization.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';
import { OrganizationType } from 'src/organization_type/entities/organization_type.entity';

@Module({
  imports: [SequelizeModule.forFeature([Organization, User, OrganizationType])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule { }
