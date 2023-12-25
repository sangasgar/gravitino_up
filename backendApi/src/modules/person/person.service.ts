import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePersonDto, UpdatePersonDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from './entities/person.entity';
import { PersonResponse, StatusPersonResponse } from './response';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person) private personRepository: typeof Person,
  ) { }

  async create(person: CreatePersonDto): Promise<PersonResponse> {
    try {
      var newPerson = await this.personRepository.create(person);
      return newPerson;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<PersonResponse[]> {
    try {
      const foundPerson = await this.personRepository.findAll();
      return foundPerson;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(person_id: number): Promise<boolean> {
    try {
      const result = await this.personRepository.findOne({ where: { person_id } });

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(updatedPerson: UpdatePersonDto) {
    try {
      await this.personRepository.update({ ...updatedPerson }, { where: { person_id: updatedPerson.person_id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(person_id: number): Promise<StatusPersonResponse> {
    try {
      const deletePerson = await this.personRepository.destroy({ where: { person_id } });

      if (deletePerson) {
        return { status: true };
      }

      return { status: false };
    } catch (error) {
      throw new Error(error);
    }
  }
}
