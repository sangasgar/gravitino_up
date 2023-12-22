import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { InjectModel } from '@nestjs/sequelize';
import { OrganizationType } from 'src/modules/organization_type/entities/organization_type.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization) private organizationRepository: typeof Organization,
    @InjectModel(OrganizationType) private organizationTypeRepository: typeof OrganizationType,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(organization: CreateOrganizationDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const organizationType = await this.organizationTypeRepository.findOne({ where: { organization_type_id: organization.organization_type_id } });
      if (organizationType == null) {
        throw new HttpException('Тип организации не найден!', HttpStatus.BAD_REQUEST);
      }

      result = await this.organizationRepository.create(organization, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Создана организация #${result.organization_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return result;
  }

  async findAll() {
    return await this.organizationRepository.findAll({ include: [OrganizationType], attributes: { exclude: ['organization_type_id'] } });
  }

  async findOne(organization_id: number) {
    const result = await this.organizationRepository.findOne({ where: { organization_id }, include: [OrganizationType], attributes: { exclude: ['organization_type_id'] } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Организация не найдена!'
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedOrganization: UpdateOrganizationDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };
      const foundOrganization = await this.organizationRepository.findOne({ where: { organization_id: updatedOrganization.organization_id } });

      if (foundOrganization == null) {
        throw new HttpException('Организация не найдена!', HttpStatus.BAD_REQUEST);
      }

      if (updatedOrganization.organization_type_id != undefined) {
        const organizationType = await this.organizationTypeRepository.findOne({ where: { organization_type_id: updatedOrganization.organization_type_id } });
        if (organizationType == null) {
          throw new HttpException('Тип организации не найден!', HttpStatus.BAD_REQUEST);
        }
      }

      result = await foundOrganization.update(updatedOrganization, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Изменена организация #${result.organization_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return result;
  }

  async remove(organization_id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const foundOrganization = await this.organizationRepository.findOne({ where: { organization_id } });
      if (foundOrganization == null) {
        throw new HttpException('Организация не найдена!', HttpStatus.BAD_REQUEST);
      }

      await this.organizationRepository.destroy({ where: { organization_id }, transaction: trx }).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Удалена организация #${organization_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return { statusCode: 200, message: 'Строка успешно удалена!' };
  }
}
