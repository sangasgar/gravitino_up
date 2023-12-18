import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { InjectModel } from '@nestjs/sequelize';
import { OrganizationType } from 'src/modules/organization_type/entities/organization_type.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization) private organizationRepository: typeof Organization,
    @InjectModel(OrganizationType) private organizationTypeRepository: typeof OrganizationType,
  ) { }

  async create(organization: CreateOrganizationDto) {
    const organization_type_id = organization.organization_type_id;
    const organizationType = await this.organizationTypeRepository.findOne({ where: { organization_type_id } });

    if (organizationType == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Тип не найден!'
        }
      )
    }

    var newOrganization = await this.organizationRepository.create(organization);
    return newOrganization;
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

  async update(updatedOrganization: UpdateOrganizationDto) {
    const organization_id = updatedOrganization.organization_id;
    const foundOrganization = await this.organizationRepository.findOne({ where: { organization_id } });

    if (foundOrganization == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Организация не найдена!'
        }
      )
    }

    await foundOrganization.update(updatedOrganization);

    return updatedOrganization;
  }

  async remove(organization_id: number) {
    const foundOrganization = await this.organizationRepository.findOne({ where: { organization_id } });

    if (foundOrganization == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Организация не найдена!'
        }
      )
    } else {
      await this.organizationRepository.destroy({ where: { organization_id } });
      return { statusCode: 200, message: 'Строка успешно удалена!' };
    }
  }
}
