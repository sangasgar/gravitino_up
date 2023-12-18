import { Module } from '@nestjs/common';
import { OrganizationTypeService } from './organization_type.service';
import { OrganizationTypeController } from './organization_type.controller';
import { OrganizationType } from './entities/organization_type.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([OrganizationType])],
  controllers: [OrganizationTypeController],
  providers: [OrganizationTypeService],
})
export class OrganizationTypeModule { }
