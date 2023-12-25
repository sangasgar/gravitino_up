import { Injectable } from '@nestjs/common';
import { CreateOrganizationTypeDto, UpdateOrganizationTypeDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrganizationType } from './entities/organization_type.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { OrganizationTypeResponse, StatusOrganizationTypeResponse } from './response';

@Injectable()
export class OrganizationTypeService {
  constructor(
    @InjectModel(OrganizationType) private organizationTypeRepository: typeof OrganizationType,
    private readonly historyService: TransactionHistoryService,
  ) { }

  async create(organizationType: CreateOrganizationTypeDto, user_id: number): Promise<OrganizationTypeResponse> {
    try {
      const newType = await this.organizationTypeRepository.create(organizationType)

      const historyDto = {
        "user_id": user_id,
        "comment": `Создан тип организации #${newType.organization_type_id}`,
      }
      await this.historyService.create(historyDto);

      return newType;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<OrganizationTypeResponse[]> {
    try {
      const foundTypes = await this.organizationTypeRepository.findAll();
      return foundTypes;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(organization_type_id: number): Promise<boolean> {
    try {
      const result = await this.organizationTypeRepository.findOne({ where: { organization_type_id } });

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(updatedOrganizationType: UpdateOrganizationTypeDto, user_id: number): Promise<OrganizationTypeResponse> {
    try {
      let foundType = null;
      await this.organizationTypeRepository.update({ ...updatedOrganizationType }, { where: { organization_type_id: updatedOrganizationType.organization_type_id } });

      foundType = await this.organizationTypeRepository.findOne({ where: { organization_type_id: updatedOrganizationType.organization_type_id } });

      if (foundType) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Изменен тип организации #${foundType.organization_type_id}`,
        }
        await this.historyService.create(historyDto);
      }

      return foundType;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(organization_type_id: number, user_id: number): Promise<StatusOrganizationTypeResponse> {
    try {
      const deleteType = await this.organizationTypeRepository.destroy({ where: { organization_type_id } });

      if (deleteType) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Удален тип организации #${organization_type_id}`,
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
