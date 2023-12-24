import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { Person } from './entities/person.entity';
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person) private personRepository: typeof Person,
  ) { }

  async create(person: CreatePersonDto) {
    var newPerson = await this.personRepository.create(person);
    return newPerson;
  }

  async findAll() {
    return await this.personRepository.findAll();
  }

  async findOne(person_id: number) {
    const result = await this.personRepository.findOne({ where: { person_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: AppError.PERSON_NOT_FOUND
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedPerson: UpdatePersonDto) {
    const person_id = updatedPerson.person_id;
    const foundPerson = await this.personRepository.findOne({ where: { person_id } });

    if (foundPerson == null) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: AppError.PERSON_NOT_FOUND
        }
      )
    }

    await foundPerson.update(updatedPerson);

    return updatedPerson;
  }

  async remove(person_id: number) {
    const foundPerson = await this.personRepository.findOne({ where: { person_id } });

    if (foundPerson == null) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: AppError.PERSON_NOT_FOUND
        }
      )
    } else {
      await this.personRepository.destroy({ where: { person_id } });
      return { statusCode: 200, message: AppStrings.SUCCESS_ROW_DELETE };
    }
  }
}
