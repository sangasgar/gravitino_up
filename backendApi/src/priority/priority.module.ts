import { Module } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { PriorityController } from './priority.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderPriority } from './entities/priority.entity';

@Module({
  imports: [SequelizeModule.forFeature([OrderPriority])],
  controllers: [PriorityController],
  providers: [PriorityService],
})
export class PriorityModule { }
