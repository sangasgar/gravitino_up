import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Sequelize } from 'sequelize-typescript';
import { Permission } from './entities/permission.entity';
import { InjectModel } from '@nestjs/sequelize';
import { RolesPermissionsService } from '../roles_permissions/roles_permissions.service';
import { ConfigService } from '@nestjs/config';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';

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

  async findOne(id: string) {
    const result = await this.permissionRepository.findOne({ where: { permission_id: id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: AppError.PERMISSION_NOT_FOUND
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

      const permission = await this.permissionRepository.findOne({ where: { permission_id: updatedPermission.permission_id } });

      if (!permission) {
        throw new HttpException(AppError.PERMISSION_NOT_FOUND, HttpStatus.NOT_FOUND);
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

  async remove(id: string, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const permission = await this.permissionRepository.findOne({ where: { permission_id: id } });

      if (!permission) {
        throw new HttpException(AppError.PERMISSION_NOT_FOUND, HttpStatus.NOT_FOUND);
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

    return { statusCode: 200, message: AppStrings.SUCCESS_ROW_DELETE };
  }
}
