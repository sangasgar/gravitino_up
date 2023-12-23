import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Facility } from './entities/facility.entity';
import { Checkpoint } from 'src/modules/checkpoint/entities/checkpoint.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { Sequelize } from 'sequelize-typescript';
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';

@Injectable()
export class FacilityService {
  constructor(
    @InjectModel(Facility) private facilityRepository: typeof Facility,
    @InjectModel(Checkpoint) private checkpointRepository: typeof Checkpoint,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(facility: CreateFacilityDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const foundCheckpoint = await this.checkpointRepository.findOne({ where: { checkpoint_id: facility.checkpoint_id } });

      if (foundCheckpoint == null) {
        throw new HttpException(AppError.CHECKPOINT_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      result = await this.facilityRepository.create(facility, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Создан объект обслуживания #${result.facility_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return result;
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
          message: AppError.FACILITY_NOT_FOUND
        }
      )
    } else {
      return result;
    }
  }

  async update(updatedFacility: UpdateFacilityDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const foundFacility = await this.facilityRepository.findOne({ where: { facility_id: updatedFacility.facility_id }, include: [Checkpoint], attributes: { exclude: ['organization_id'] } });

      if (foundFacility == null) {
        throw new HttpException(AppError.FACILITY_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      if (updatedFacility.checkpoint_id != undefined) {
        const foundCheckpoint = await this.checkpointRepository.findOne({ where: { checkpoint_id: updatedFacility.checkpoint_id } });

        if (foundCheckpoint == null) {
          throw new HttpException(AppError.CHECKPOINT_NOT_FOUND, HttpStatus.BAD_REQUEST);
        }
      }

      result = await foundFacility.update(updatedFacility, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Изменен объект обслуживания #${result.facility_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return result;
  }

  async remove(facility_id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const foundObject = await this.facilityRepository.findOne({ where: { facility_id } });

      if (foundObject == null) {
        throw new HttpException(AppError.FACILITY_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }

      await this.facilityRepository.destroy({ where: { facility_id }, transaction: trx }).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Удален объект обслуживания #${facility_id}`,
      }
      await this.historyService.create(historyDto);
    });

    return { statusCode: 200, message: AppStrings.SUCCESS_ROW_DELETE };
  }
}
