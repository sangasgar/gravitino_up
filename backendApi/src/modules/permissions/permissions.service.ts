import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Sequelize } from 'sequelize-typescript';
import { Permission } from './entities/permission.entity';
import { InjectModel } from '@nestjs/sequelize';
import { RolesPermissionsService } from '../roles_permissions/roles_permissions.service';
import { ConfigService } from '@nestjs/config';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission) private permissionRepository: typeof Permission,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
    private readonly rpService: RolesPermissionsService,
    private readonly configService: ConfigService,
  ) { }

  async create(permission: CreatePermissionDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const permissionName = this.configService.get('rp_permission_create');
      const rights = await this.rpService.checkPermission(permissionName, user_id);
      if (!rights) {
        const historyDto = {
          "user_id": user_id,
          "comment": `${permissionName}: Отказано в доступе пользователю #${user_id}`,
        }
        await this.historyService.create(historyDto);

        throw new HttpException('Отказано в доступе', HttpStatus.FORBIDDEN);
      }

      result = await this.permissionRepository.create(permission, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Создано разрешение #${result.permission_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return result;
  }

  async findAll() {
    const result = await this.permissionRepository.findAll();

    return result;
  }

  async findOne(id: number) {
    const result = await this.permissionRepository.findOne({ where: { permission_id: id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Разрешение не найдено!'
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedPermission: UpdatePermissionDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const permissionName = this.configService.get('rp_permission_update');
      const rights = await this.rpService.checkPermission(permissionName, user_id);
      if (!rights) {
        const historyDto = {
          "user_id": user_id,
          "comment": `${permissionName}: Отказано в доступе пользователю #${user_id}`,
        }
        await this.historyService.create(historyDto);

        throw new HttpException('Отказано в доступе', HttpStatus.FORBIDDEN);
      }

      const permission = await this.permissionRepository.findOne({ where: { permission_id: updatedPermission.permission_id } });

      if (!permission) {
        throw new HttpException('Разрешение не найдено!', HttpStatus.BAD_REQUEST);
      }

      result = await permission.update(updatedPermission, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Разрешение #${result.order_id} изменено`,
      }

      await this.historyService.create(historyDto);
    })

    return result;
  }

  async remove(id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const permissionName = this.configService.get('rp_permission_delete');
      const rights = await this.rpService.checkPermission(permissionName, user_id);
      if (!rights) {
        const historyDto = {
          "user_id": user_id,
          "comment": `${permissionName}: Отказано в доступе пользователю #${user_id}`,
        }
        await this.historyService.create(historyDto);

        throw new HttpException('Отказано в доступе', HttpStatus.FORBIDDEN);
      }

      const permission = await this.permissionRepository.findOne({ where: { permission_id: id } });

      if (!permission) {
        throw new HttpException('Разрешение не найдено!', HttpStatus.BAD_REQUEST);
      }

      await this.permissionRepository.destroy({ where: { permission_id: id }, transaction: trx }).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Разрешение #${id} удалено`,
      }
      await this.historyService.create(historyDto);
    });

    return { statusCode: 200, message: 'Строка успешно удалена!' };
  }
}
