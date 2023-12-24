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
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';

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

      const user = await this.userRepository.findOne({ where: { user_id: user_id } });

      if (!user) {
        throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      const permission = await this.permissionRepository.findOne({ where: { permission_id: rolePermission.permission_id } });
      if (!permission) {
        throw new HttpException(AppError.PERMISSION_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      const role = await this.roleRepository.findOne({ where: { role_id: rolePermission.role_id } });
      if (!role) {
        throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.BAD_REQUEST);
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
          statusCode: HttpStatus.NOT_FOUND,
          message: AppError.ROLE_PERMISSION_NOT_FOUND
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

      const rolePermission = await this.rolePermissionRepository.findOne({ where: { role_permission_id: updatedRolePermission.role_permission_id } });
      if (!rolePermission) {
        throw new HttpException(AppError.ROLE_PERMISSION_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const user = await this.userRepository.findOne({ where: { user_id: user_id } });
      if (!user) {
        throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      if (updatedRolePermission.permission_id != undefined) {
        const permission = await this.permissionRepository.findOne({ where: { permission_id: updatedRolePermission.permission_id } });
        if (!permission) {
          throw new HttpException(AppError.PERMISSION_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
      }

      if (updatedRolePermission.role_id != undefined) {
        const role = await this.roleRepository.findOne({ where: { role_id: updatedRolePermission.role_id } });
        if (!role) {
          throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.BAD_REQUEST);
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
      const rolePermission = await this.rolePermissionRepository.findOne({ where: { role_permission_id: id } });

      if (!rolePermission) {
        throw new HttpException(AppError.ROLE_PERMISSION_NOT_FOUND, HttpStatus.NOT_FOUND);
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

    return { statusCode: 200, message: AppStrings.SUCCESS_ROW_DELETE };
  }

  async checkPermission(action: string, user_id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { user_id: user_id } });
    if (!user) {
      return false;
    }

    const permission = (await this.permissionRepository.findOne({ where: { permission_id: action } }));
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
