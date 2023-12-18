import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role,) { }

  async create(role: CreateRoleDto) {
    var newRole = await this.roleRepository.create(role);
    return newRole;
  }

  findAll() {
    return this.roleRepository.findAll();
  }

  async findOne(role_id: number) {
    const result = await this.roleRepository.findOne({ where: { role_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Роль не найдена!'
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedRole: UpdateRoleDto) {
    const role_id = updatedRole.role_id;
    const foundRole = await this.roleRepository.findOne({ where: { role_id } });

    if (foundRole == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Роль не найдена!'
        }
      )
    }

    await foundRole.update(updatedRole);

    return updatedRole;
  }

  async remove(role_id: number) {
    const result = await this.roleRepository.findOne({ where: { role_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Роль не найдена!'
        }
      )
    } else {
      await this.roleRepository.destroy({ where: { role_id } });
      return { statusCode: 200, message: 'Строка успешно удалена!' };
    }
  }
}
