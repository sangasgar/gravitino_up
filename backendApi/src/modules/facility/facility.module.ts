import { Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Facility } from './entities/facility.entity';
import { Checkpoint } from 'src/modules/checkpoint/entities/checkpoint.entity';

@Module({
  imports: [SequelizeModule.forFeature([Facility, Checkpoint])],
  controllers: [FacilityController],
  providers: [FacilityService],
})
export class FacilityModule { }
