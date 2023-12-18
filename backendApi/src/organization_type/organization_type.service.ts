import { Injectable } from '@nestjs/common';
import { CreateOrganizationTypeDto } from './dto/create-organization_type.dto';
import { UpdateOrganizationTypeDto } from './dto/update-organization_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrganizationType } from './entities/organization_type.entity';

@Injectable()
export class OrganizationTypeService {
  constructor(@InjectModel(OrganizationType) private organizationTypeRepository: typeof OrganizationType,) { }

  async create(organizationType: CreateOrganizationTypeDto) {
    var newObject = await this.organizationTypeRepository.create(organizationType);
    return newObject;
  }

  async findAll() {
    return await this.organizationTypeRepository.findAll();
  }

  async findOne(organization_type_id: number) {
    const result = await this.organizationTypeRepository.findOne({ where: { organization_type_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Тип не найден!'
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedOrganizationType: UpdateOrganizationTypeDto) {
    const organization_type_id = updatedOrganizationType.organization_type_id;
    const result = await this.organizationTypeRepository.findOne({ where: { organization_type_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Тип не найден!'
        }
      )
    }

    await result.update(updatedOrganizationType);

    return updatedOrganizationType;
  }

  async remove(organization_type_id: number) {
    const result = await this.organizationTypeRepository.findOne({ where: { organization_type_id } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Тип не найден!'
        }
      )
    } else {
      await this.organizationTypeRepository.destroy({ where: { organization_type_id } });
      return { statusCode: 200, message: 'Строка успешно удалена!' };
    }
  }
}
