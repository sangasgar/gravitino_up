import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRolesPermissionDto, UpdateRolesPermissionDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { RolePermission } from './entities/roles_permission.entity';
import { RolePermissionResponse, StatusRolePermissionResponse } from './response';
import { UsersService } from '../users/users.service';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class RolesPermissionsService {
  constructor(
    @InjectModel(RolePermission) private rolePermissionRepository: typeof RolePermission,
    private readonly historyService: TransactionHistoryService,
    private readonly usersService: UsersService,
    private readonly permissionsService: PermissionsService,
  ) { }

  async create(rolePermission: CreateRolesPermissionDto, user_id: number): Promise<RolePermissionResponse> {
    try {
      const newRolePermission = await this.rolePermissionRepository.create(rolePermission);

      const historyDto = {
        "user_id": user_id,
        "comment": `Выдано разрешение #${newRolePermission.permission_id} со значением ${newRolePermission.rights} роли #${newRolePermission.role_id}`,
      }
      await this.historyService.create(historyDto);

      return newRolePermission;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<RolePermissionResponse[]> {
    try {
      const result = await this.rolePermissionRepository.findAll();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<boolean> {
    const foundRolePermission = await this.rolePermissionRepository.findOne({ where: { role_permission_id: id } });

    if (foundRolePermission) {
      return true;
    } else {
      return false;
    }
  }

  async update(updatedRolePermission: UpdateRolesPermissionDto, user_id: number): Promise<RolePermissionResponse> {
    try {
      await this.rolePermissionRepository.update({ ...updatedRolePermission }, { where: { role_permission_id: updatedRolePermission.role_permission_id } });

      const foundRolePermission = await this.rolePermissionRepository.findOne({ where: { role_permission_id: updatedRolePermission.role_permission_id } });

      if (foundRolePermission) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Обновлено разрешение #${foundRolePermission.permission_id} со значением ${foundRolePermission.rights} роли #${foundRolePermission.role_id}`,
        }
        await this.historyService.create(historyDto);
      }

      return foundRolePermission;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(role_permission_id: number, user_id: number): Promise<StatusRolePermissionResponse> {
    try {
      const deleteRolePermission = await this.rolePermissionRepository.destroy({ where: { role_permission_id } });

      if (deleteRolePermission) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Отозвано разрешение #${role_permission_id}`,
        }
        await this.historyService.create(historyDto);

        return { status: true };
      }

      return { status: false };
    } catch (error) {
      throw new Error(error);
    }
  }

  async checkPermission(permission_id: string, user_id: number): Promise<boolean> {
    const user = await this.usersService.findById(user_id);
    if (!user) {
      return false;
    }

    const permission = (await this.permissionsService.findOne(permission_id));
    if (!permission) {
      return false;
    }

    const rolePermission = await this.rolePermissionRepository.findOne({ where: { permission_id: permission_id, role_id: user.role_id } });

    if (!rolePermission || !rolePermission.rights) {
      return false;
    } else {
      return true;
    }
  }
}
