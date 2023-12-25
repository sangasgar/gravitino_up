import { Injectable } from '@nestjs/common';
import { CreateFacilityDto, UpdateFacilityDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Facility } from './entities/facility.entity';
import { Checkpoint } from 'src/modules/checkpoint/entities/checkpoint.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { FacilityResponse, StatusFacilityResponse } from './response';

@Injectable()
export class FacilityService {
  constructor(
    @InjectModel(Facility) private facilityRepository: typeof Facility,
    private readonly historyService: TransactionHistoryService,
  ) { }

  async create(facility: CreateFacilityDto, user_id: number): Promise<FacilityResponse> {
    try {
      const newFacility = await this.facilityRepository.create(facility);

      const historyDto = {
        "user_id": user_id,
        "comment": `Создан объект обслуживания #${newFacility.facility_id}`,
      }
      await this.historyService.create(historyDto);

      return newFacility;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<FacilityResponse[]> {
    try {
      const result = await this.facilityRepository.findAll({ include: [Checkpoint], attributes: { exclude: ['checkpoint_id'] } });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(facility_id: number): Promise<boolean> {
    try {
      const result = await this.facilityRepository.findOne({ where: { facility_id } });

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(updatedFacility: UpdateFacilityDto, user_id: number): Promise<FacilityResponse> {
    try {
      await this.facilityRepository.update({ ...updatedFacility }, { where: { checkpoint_id: updatedFacility.facility_id } });

      const foundFacility = await this.facilityRepository.findOne({ where: { checkpoint_id: updatedFacility.facility_id } });

      if (foundFacility) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Изменен объект обслуживания #${foundFacility.facility_id}`,
        }
        await this.historyService.create(historyDto);
      }

      return foundFacility;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(facility_id: number, user_id: number): Promise<StatusFacilityResponse> {
    try {
      const deleteFacility = await this.facilityRepository.destroy({ where: { facility_id } });

      if (deleteFacility) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Удален объект обслуживания #${facility_id}`,
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
