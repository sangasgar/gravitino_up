import { Injectable } from '@nestjs/common';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Checkpoint } from './entities/checkpoint.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { OrganizationType } from 'src/organization_type/entities/organization_type.entity';

@Injectable()
export class CheckpointService {
  constructor(
    @InjectModel(Checkpoint) private checkpointRepository: typeof Checkpoint,
    @InjectModel(Organization) private organizationRepository: typeof Organization,
  ) { }

  async create(checkpoint: CreateCheckpointDto) {
    const organization_id = checkpoint.organization_id;
    const foundOrganization = await this.organizationRepository.findOne({ where: { organization_id } });

    if (foundOrganization == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Организация не найдена!'
        }
      )
    }

    var newObject = await this.checkpointRepository.create(checkpoint);
    return newObject;
  }

  async findAll() {
    return await this.checkpointRepository.findAll({ include: [Organization], attributes: { exclude: ['organization_id'] } });
  }

  async findOne(checkpoint_id: number) {
    const result = await this.checkpointRepository.findOne({ where: { checkpoint_id }, include: [Organization], attributes: { exclude: ['organization_id'] } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Пункт пропуска не найден!'
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedCheckpoint: UpdateCheckpointDto) {
    const checkpoint_id = updatedCheckpoint.checkpoint_id;
    const foundCheckpoint = await this.checkpointRepository.findOne({ where: { checkpoint_id }, include: [Organization], attributes: { exclude: ['organization_id'] } });

    if (foundCheckpoint == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Пункт пропуска не найден!'
        }
      )
    }

    var foundOrganization;
    if (updatedCheckpoint.organization_id != undefined) {
      const organization_id = updatedCheckpoint.organization_id;
      foundOrganization = await this.organizationRepository.findOne({ where: { organization_id } });

      if (foundOrganization == null) {
        return Promise.reject(
          {
            statusCode: 404,
            message: 'Организация не найдена!'
          }
        )
      }
    }

    await foundCheckpoint.update(updatedCheckpoint);

    return updatedCheckpoint;
  }

  async remove(checkpoint_id: number) {
    const foundObject = await this.checkpointRepository.findOne({ where: { checkpoint_id } });

    if (foundObject == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Пункт пропуска не найден!'
        }
      )
    } else {
      await this.checkpointRepository.destroy({ where: { checkpoint_id } });
      return { statusCode: 200, message: 'Строка успешно удалена!' };
    }
  }
}
