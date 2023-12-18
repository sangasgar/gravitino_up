import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group) private groupRepository: typeof Group,) { }

  async create(group: CreateGroupDto) {
    var newObject = await this.groupRepository.create(group);
    return newObject;
  }

  async findAll() {
    return await this.groupRepository.findAll();
  }

  async findOne(group_id: number) {
    const result = await this.groupRepository.findOne({ where: { group_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Группа не найдена!'
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedGroup: UpdateGroupDto) {
    const group_id = updatedGroup.group_id;
    const foundObject = await this.groupRepository.findOne({ where: { group_id } });

    if (foundObject == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Группа не найдена!'
        }
      )
    }

    await foundObject.update(updatedGroup);

    return updatedGroup;
  }

  async remove(group_id: number) {
    const result = await this.groupRepository.findOne({ where: { group_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Группа не найдена!'
        }
      )
    } else {
      await this.groupRepository.destroy({ where: { group_id } });
      return { statusCode: 200, message: 'Строка успешно удалена!' };
    }
  }
}
