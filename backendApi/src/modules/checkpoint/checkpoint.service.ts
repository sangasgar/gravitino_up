import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Checkpoint } from './entities/checkpoint.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { OrganizationType } from 'src/modules/organization_type/entities/organization_type.entity';
import { Sequelize } from 'sequelize-typescript';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';

@Injectable()
export class CheckpointService {
  constructor(
    @InjectModel(Checkpoint) private checkpointRepository: typeof Checkpoint,
    @InjectModel(Organization) private organizationRepository: typeof Organization,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(checkpoint: CreateCheckpointDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const organization_id = checkpoint.organization_id;
      const foundOrganization = await this.organizationRepository.findOne({ where: { organization_id } });

      if (foundOrganization == null) {
        throw new HttpException(AppError.ORGANIZATION_NOT_FOUND, HttpStatus.NOT_FOUND)
      }

      result = await this.checkpointRepository.create(checkpoint, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Создан пункт пропуска #${result.checkpoint_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return result
  }

  async findAll() {
    return await this.checkpointRepository.findAll({ include: [Organization], attributes: { exclude: ['organization_id'] } });
  }

  async findOne(checkpoint_id: number) {
    const result = await this.checkpointRepository.findOne({ where: { checkpoint_id }, include: [Organization], attributes: { exclude: ['organization_id'] } });

    if (result == null) {
      throw new HttpException(AppError.CHECKPOINT_NOT_FOUND, HttpStatus.NOT_FOUND)
    } else {
      return result;
    }
  }

  async update(updatedCheckpoint: UpdateCheckpointDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const checkpoint_id = updatedCheckpoint.checkpoint_id;
      const foundCheckpoint = await this.checkpointRepository.findOne({ where: { checkpoint_id }, include: [Organization], attributes: { exclude: ['organization_id'] } });

      if (!foundCheckpoint) {
        throw new HttpException(AppError.CHECKPOINT_NOT_FOUND, HttpStatus.NOT_FOUND)
      }

      var foundOrganization;
      if (updatedCheckpoint.organization_id != undefined) {
        const organization_id = updatedCheckpoint.organization_id;
        foundOrganization = await this.organizationRepository.findOne({ where: { organization_id } });

        if (!foundOrganization) {
          throw new HttpException(AppError.ORGANIZATION_NOT_FOUND, HttpStatus.BAD_REQUEST)
        }
      }

      await foundCheckpoint.update(updatedCheckpoint, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });



      const historyDto = {
        "user_id": user_id,
        "comment": `Изменен пункт пропуска #${result.checkpoint_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return result;
  }

  async remove(checkpoint_id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const foundObject = await this.checkpointRepository.findOne({ where: { checkpoint_id } });

      if (foundObject == null) {
        throw new HttpException(AppError.CHECKPOINT_NOT_FOUND, HttpStatus.NOT_FOUND)
      }

      await this.checkpointRepository.destroy({ where: { checkpoint_id }, transaction: trx }).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Удален пункт пропуска #${checkpoint_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return { statusCode: 200, message: AppStrings.SUCCESS_ROW_DELETE };
  }
}
