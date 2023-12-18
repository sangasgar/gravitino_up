import { Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Facility } from './entities/facility.entity';
import { Checkpoint } from 'src/modules/checkpoint/entities/checkpoint.entity';

@Injectable()
export class FacilityService {
  constructor(
    @InjectModel(Facility) private facilityRepository: typeof Facility,
    @InjectModel(Checkpoint) private checkpointRepository: typeof Checkpoint,
  ) { }

  async create(facility: CreateFacilityDto) {
    const checkpoint_id = facility.checkpoint_id;
    const foundCheckpoint = await this.checkpointRepository.findOne({ where: { checkpoint_id } });

    if (foundCheckpoint == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Пункт пропуска не найден!'
        }
      )
    }

    var newObject = await this.facilityRepository.create(facility);
    return newObject;
  }

  async findAll() {
    return await this.facilityRepository.findAll({ include: [Checkpoint], attributes: { exclude: ['checkpoint_id'] } });
  }

  async findOne(facility_id: number) {
    const result = await this.facilityRepository.findOne({ where: { facility_id }, include: [Checkpoint], attributes: { exclude: ['checkpoint_id'] } });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Объект обслуживания не найден!'
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedFacility: UpdateFacilityDto) {
    const facility_id = updatedFacility.facility_id;
    const foundFacility = await this.facilityRepository.findOne({ where: { facility_id }, include: [Checkpoint], attributes: { exclude: ['organization_id'] } });

    if (foundFacility == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Объект обслуживания не найден!'
        }
      )
    }

    var foundCheckpoint;
    if (updatedFacility.checkpoint_id) {
      const checkpoint_id = updatedFacility.checkpoint_id;
      foundCheckpoint = await this.checkpointRepository.findOne({ where: { checkpoint_id } });

      if (foundCheckpoint == null) {
        return Promise.reject(
          {
            statusCode: 404,
            message: 'Пункт пропуска не найден!'
          }
        )
      }
    }

    await foundFacility.update(updatedFacility);

    return updatedFacility;
  }

  async remove(facility_id: number) {
    const foundObject = await this.facilityRepository.findOne({ where: { facility_id } });

    if (foundObject == null) {
      return Promise.reject(
        {
          statusCode: 404,
          message: 'Объект обслуживания не найден!'
        }
      )
    } else {
      await this.facilityRepository.destroy({ where: { facility_id } });
      return { statusCode: 200, message: 'Строка успешно удалена!' };
    }
  }
}
