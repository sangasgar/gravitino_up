import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRolesPermissionDto } from './dto/create-roles_permission.dto';
import { UpdateRolesPermissionDto } from './dto/update-roles_permission.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { User } from '../users/entities/user.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { Sequelize } from 'sequelize-typescript';
import { RolePermission } from './entities/roles_permission.entity';
import { where } from 'sequelize';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesPermissionsService {
  constructor(
    @InjectModel(RolePermission) private rolePermissionRepository: typeof RolePermission,
    @InjectModel(Permission) private permissionRepository: typeof Permission,
    @InjectModel(Role) private roleRepository: typeof Role,
    @InjectModel(User) private userRepository: typeof User,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
    private readonly configService: ConfigService,
  ) { }

  async create(rolePermission: CreateRolesPermissionDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const permissionName = this.configService.get('rp_role_permission_create');
      const rights = await this.checkPermission(permissionName, user_id);
      if (!rights) {
        const historyDto = {
          "user_id": user_id,
          "comment": `${permissionName}: Отказано в доступе пользователю #${user_id}`,
        }
        await this.historyService.create(historyDto);

        throw new HttpException('Отказано в доступе', HttpStatus.FORBIDDEN);
      }

      const user = await this.userRepository.findOne({ where: { user_id: user_id } });

      if (!user) {
        throw new HttpException('Пользователь не найден!', HttpStatus.BAD_REQUEST);
      }

      const permission = await this.permissionRepository.findOne({ where: { permission_id: rolePermission.permission_id } });
      if (!permission) {
        throw new HttpException('Разрешение не найдено!', HttpStatus.BAD_REQUEST);
      }

      const role = await this.roleRepository.findOne({ where: { role_id: rolePermission.role_id } });
      if (!role) {
        throw new HttpException('Роль не найдена!', HttpStatus.BAD_REQUEST);
      }

      result = await this.rolePermissionRepository.create(rolePermission, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Выдано разрешение #${result.permission_id} со значением ${result.rights} роли #${result.role_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return result;
  }

  async findAll() {
    const result = await this.rolePermissionRepository.findAll();

    return result;
  }

  async findOne(id: number) {
    const result = await this.rolePermissionRepository.findOne({ where: { role_permission_id: id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Запись не найдена!'
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedRolePermission: UpdateRolesPermissionDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const permissionName = this.configService.get('rp_role_permission_update');
      const rights = await this.checkPermission(permissionName, user_id);
      if (!rights) {
        const historyDto = {
          "user_id": user_id,
          "comment": `${permissionName}: Отказано в доступе пользователю #${user_id}`,
        }
        await this.historyService.create(historyDto);

        throw new HttpException('Отказано в доступе', HttpStatus.FORBIDDEN);
      }

      const user = await this.userRepository.findOne({ where: { user_id: user_id } });
      if (!user) {
        throw new HttpException('Пользователь не найден!', HttpStatus.BAD_REQUEST);
      }

      const rolePermission = await this.rolePermissionRepository.findOne({ where: { role_permission_id: updatedRolePermission.role_permission_id } });
      if (!rolePermission) {
        throw new HttpException('Разрешение не найдено!', HttpStatus.BAD_REQUEST);
      }

      if (updatedRolePermission.permission_id != undefined) {
        const permission = await this.permissionRepository.findOne({ where: { permission_id: updatedRolePermission.permission_id } });
        if (!permission) {
          throw new HttpException('Разрешение не найдено!', HttpStatus.BAD_REQUEST);
        }
      }

      if (updatedRolePermission.role_id != undefined) {
        const role = await this.roleRepository.findOne({ where: { role_id: updatedRolePermission.role_id } });
        if (!role) {
          throw new HttpException('Роль не найдена!', HttpStatus.BAD_REQUEST);
        }
      }

      result = await rolePermission.update(updatedRolePermission, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Обновлено разрешение #${result.permission_id} со значением ${result.rights} роли #${result.role_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return result;
  }

  async remove(id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const permissionName = this.configService.get('rp_role_permission_delete');
      const rights = await this.checkPermission(permissionName, user_id);
      if (!rights) {
        const historyDto = {
          "user_id": user_id,
          "comment": `${permissionName}: Отказано в доступе пользователю #${user_id}`,
        }
        await this.historyService.create(historyDto);

        throw new HttpException('Отказано в доступе', HttpStatus.FORBIDDEN);
      }

      const rolePermission = await this.rolePermissionRepository.findOne({ where: { role_permission_id: id } });

      if (!rolePermission) {
        throw new HttpException('Запись не найдена!', HttpStatus.BAD_REQUEST);
      }

      await this.rolePermissionRepository.destroy({ where: { role_permission_id: id }, transaction: trx }).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });;

      const historyDto = {
        "user_id": user_id,
        "comment": `Отозвано разрешение #${rolePermission.role_permission_id} со значением ${rolePermission.rights} роли #${rolePermission.role_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return { statusCode: 200, message: 'Строка успешно удалена!' };
  }

  async checkPermission(action: string, user_id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { user_id: user_id } });
    if (!user) {
      return false;
    }

    const permission = (await this.permissionRepository.findOne({ where: { action_name: action } }));
    if (!permission) {
      return false;
    }

    const permission_id = permission.permission_id;

    const rolePermission = await this.rolePermissionRepository.findOne({ where: { permission_id: permission_id, role_id: user.role_id } });

    if (!rolePermission || !rolePermission.rights) {
      return false;
    } else {
      return true;
    }
  }
}
