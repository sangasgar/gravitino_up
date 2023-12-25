import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto, UpdatePermissionDto } from './dto';
import { Permission } from './entities/permission.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { PermissionResponse, StatusPermissionResponse } from './response';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission) private permissionRepository: typeof Permission,
    private readonly historyService: TransactionHistoryService,
  ) { }

  async create(permission: CreatePermissionDto, user_id: number): Promise<PermissionResponse> {
    try {
      const newPermission = await this.permissionRepository.create(permission);

      const historyDto = {
        "user_id": user_id,
        "comment": `Создано разрешение #${newPermission.permission_id}`,
      }
      await this.historyService.create(historyDto);

      return newPermission;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<PermissionResponse[]> {
    try {
      const result = await this.permissionRepository.findAll();
      return result;
    } catch (error) {
      throw new Error(error);
    }

  }

  async findOne(id: string): Promise<boolean> {
    try {
      const foundPermission = await this.permissionRepository.findOne({ where: { permission_id: id } });

      if (foundPermission) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(updatedPermission: UpdatePermissionDto, user_id: number): Promise<PermissionResponse> {
    try {
      await this.permissionRepository.update({ ...updatedPermission }, { where: { permission_id: updatedPermission.permission_id } });

      const foundPermission = await this.permissionRepository.findOne({ where: { permission_id: updatedPermission.permission_id } });

      if (foundPermission) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Разрешение #${foundPermission.permission_id} изменено`,
        }
        await this.historyService.create(historyDto);
      }

      return foundPermission;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(permission_id: string, user_id: number): Promise<StatusPermissionResponse> {
    try {
      const deletePermission = await this.permissionRepository.destroy({ where: { permission_id } });

      if (deletePermission) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Разрешение #${permission_id} удалено`,
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
