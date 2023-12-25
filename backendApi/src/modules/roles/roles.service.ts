import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Role } from './entities/role.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { Sequelize } from 'sequelize-typescript';
import { RoleResponse } from './response';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(role: CreateRoleDto, user_id: number): Promise<RoleResponse> {
    try {
      const newRole = await this.roleRepository.create(role);

      const historyDto = {
        "user_id": user_id,
        "comment": `Создана роль #${newRole.role_id}`,
      }
      await this.historyService.create(historyDto);

      return newRole;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<RoleResponse[]> {
    try {
      const result = this.roleRepository.findAll();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(role_id: number): Promise<boolean> {
    try {
      const foundRole = await this.roleRepository.findOne({ where: { role_id } });

      if (foundRole) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(updatedRole: UpdateRoleDto, user_id: number) {
    try {
      await this.roleRepository.update({ ...updatedRole }, { where: { role_id: updatedRole.role_id } });

      const foundRole = await this.roleRepository.findOne({ where: { role_id: updatedRole.role_id } });

      if (foundRole) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Изменена роль #${foundRole.role_id}`,
        }
        await this.historyService.create(historyDto);
      }

      return foundRole;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(role_id: number, user_id: number) {
    try {
      const deleteRole = await this.roleRepository.destroy({ where: { role_id } });

      if (deleteRole) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Удалена роль #${role_id}`,
        }
        await this.historyService.create(historyDto);

        return { status: true };
      }

      return { status: false };
    } catch (error) {
      throw new Error(error);
    }
  }
}
