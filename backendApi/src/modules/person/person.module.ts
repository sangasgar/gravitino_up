import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { Person } from './entities/person.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Person])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule { }
