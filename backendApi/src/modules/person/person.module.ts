import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { Person } from './entities/person.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonModule]
})
export class PersonModule { }
