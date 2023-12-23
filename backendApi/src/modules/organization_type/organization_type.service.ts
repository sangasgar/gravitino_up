import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrganizationTypeDto } from './dto/create-organization_type.dto';
import { UpdateOrganizationTypeDto } from './dto/update-organization_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrganizationType } from './entities/organization_type.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { Sequelize } from 'sequelize-typescript';
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';

@Injectable()
export class OrganizationTypeService {
  constructor(
    @InjectModel(OrganizationType) private organizationTypeRepository: typeof OrganizationType,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(organizationType: CreateOrganizationTypeDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      result = await this.organizationTypeRepository.create(organizationType, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Создан тип организации #${result.organization_type_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return result;
  }

  async findAll() {
    return await this.organizationTypeRepository.findAll();
  }

  async findOne(organization_type_id: number) {
    const result = await this.organizationTypeRepository.findOne({ where: { organization_type_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: AppError.ORGANIZATION_TYPE_NOT_FOUND
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedOrganizationType: UpdateOrganizationTypeDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const organization_type = await this.organizationTypeRepository.findOne({ where: { organization_type_id: updatedOrganizationType.organization_type_id } });

      if (!organization_type) {
        throw new HttpException(AppError.ORGANIZATION_TYPE_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      result = await organization_type.update(updatedOrganizationType, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Изменен тип организации #${result.organization_type_id}`,
      }
      await this.historyService.create(historyDto);;
    })

    return result;
  }

  async remove(organization_type_id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const result = await this.organizationTypeRepository.findOne({ where: { organization_type_id } });

      if (result == null) {
        throw new HttpException(AppError.ORGANIZATION_TYPE_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      await this.organizationTypeRepository.destroy({ where: { organization_type_id }, transaction: trx }).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Удален тип организации #${result.organization_type_id}`,
      }
      await this.historyService.create(historyDto);;
    });
    return { statusCode: 200, message: AppStrings.SUCCESS_ROW_DELETE };
  }
}
