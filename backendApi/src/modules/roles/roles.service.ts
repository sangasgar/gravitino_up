import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { Sequelize } from 'sequelize-typescript';
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(role: CreateRoleDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      result = await this.roleRepository.create(role, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Создана роль #${result.organization_type_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return result;
  }

  findAll() {
    return this.roleRepository.findAll();
  }

  async findOne(role_id: number) {
    const result = await this.roleRepository.findOne({ where: { role_id } });

    if (result == null) {
      throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }

  async update(updatedRole: UpdateRoleDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const role_id = updatedRole.role_id;
      const foundRole = await this.roleRepository.findOne({ where: { role_id } });

      if (!foundRole) {
        throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      result = await foundRole.update(updatedRole, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Изменена роль #${result.organization_type_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return result;
  }

  async remove(role_id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const result = await this.roleRepository.findOne({ where: { role_id } });

      if (!result) {
        throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      await this.roleRepository.destroy({ where: { role_id }, transaction: trx }).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Удалена роль #${result.role_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return { statusCode: 200, message: AppStrings.SUCCESS_ROW_DELETE };
  }
}
