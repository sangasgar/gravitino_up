import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto';
import { Organization } from './entities/organization.entity';
import { InjectModel } from '@nestjs/sequelize';
import { OrganizationType } from 'src/modules/organization_type/entities/organization_type.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { Sequelize } from 'sequelize-typescript';
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';
import { OrganizationResponse, StatusOrganizationResponse } from './response';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization) private organizationRepository: typeof Organization,
    private readonly historyService: TransactionHistoryService,
  ) { }

  async create(organization: CreateOrganizationDto, user_id: number): Promise<OrganizationResponse> {
    try {
      const newOrganization = await this.organizationRepository.create(organization);

      const historyDto = {
        "user_id": user_id,
        "comment": `Создана организация #${newOrganization.organization_id}`,
      }
      await this.historyService.create(historyDto);

      return newOrganization;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<OrganizationResponse[]> {
    try {
      const foundOrganization = await this.organizationRepository.findAll({ include: [OrganizationType] });
      return foundOrganization;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(organization_id: number): Promise<boolean> {
    try {
      const result = await this.organizationRepository.findOne({ where: { organization_id } });

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(updatedOrganization: UpdateOrganizationDto, user_id: number): Promise<OrganizationResponse> {
    try {
      let foundOrganization = null;
      await this.organizationRepository.update({ ...updatedOrganization }, { where: { organization_id: updatedOrganization.organization_id } });

      foundOrganization = await this.organizationRepository.findOne({ where: { organization_id: updatedOrganization.organization_id } });

      if (foundOrganization) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Изменена организация #${foundOrganization.organization_id}`,
        }
        await this.historyService.create(historyDto);
      }

      return foundOrganization;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(organization_id: number, user_id: number): Promise<StatusOrganizationResponse> {
    try {
      const deleteOrganization = await this.organizationRepository.destroy({ where: { organization_id } });

      if (deleteOrganization) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Удалена организация #${organization_id}`,
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
