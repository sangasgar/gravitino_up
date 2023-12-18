import { Module } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CheckpointController } from './checkpoint.controller';
import { Checkpoint } from './entities/checkpoint.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Organization } from 'src/organization/entities/organization.entity';

@Module({
  imports: [SequelizeModule.forFeature([Checkpoint, Organization])],
  controllers: [CheckpointController],
  providers: [CheckpointService],
})
export class CheckpointModule { }
