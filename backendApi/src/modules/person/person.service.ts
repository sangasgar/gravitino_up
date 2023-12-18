import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { Person } from './entities/person.entity';

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
          statusCode: 404,
          message: 'Данные пользователя не найдены!'
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
          statusCode: 404,
          message: 'Данные пользователя не найдены!'
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
          statusCode: 404,
          message: 'Данные пользователя не найдены!'
        }
      )
    } else {
      await this.personRepository.destroy({ where: { person_id } });
      return { statusCode: 200, message: 'Строка успешно удалена!' };
    }
  }
}
