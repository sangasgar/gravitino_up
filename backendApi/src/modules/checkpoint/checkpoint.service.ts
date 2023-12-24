import { Injectable } from '@nestjs/common';
import { CreateCheckpointDto, UpdateCheckpointDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Checkpoint } from './entities/checkpoint.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { CheckpointResponse, StatusCheckpointResponse } from './response';

@Injectable()
export class CheckpointService {
  constructor(
    @InjectModel(Checkpoint) private checkpointRepository: typeof Checkpoint,
    private readonly historyService: TransactionHistoryService,
  ) { }

  async create(checkpoint: CreateCheckpointDto, user_id: number): Promise<CheckpointResponse> {
    const newCheckpoint = await this.checkpointRepository.create(checkpoint);

    const historyDto = {
      "user_id": user_id,
      "comment": `Создан пункт пропуска #${newCheckpoint.checkpoint_id}`,
    }
    await this.historyService.create(historyDto);

    return newCheckpoint;
  }

  async findAll(): Promise<CheckpointResponse[]> {
    try {
      const result = await this.checkpointRepository.findAll({ include: [Organization], attributes: { exclude: ['organization_id'] } });
      return result;

    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(checkpoint_id: number): Promise<boolean> {
    try {
      const foundCheckpoint = await this.checkpointRepository.findOne({ where: { checkpoint_id } });

      if (foundCheckpoint) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }

  }

  async update(updatedCheckpoint: UpdateCheckpointDto, user_id: number): Promise<CheckpointResponse> {
    try {
      let foundCheckpoint = null;
      await this.checkpointRepository.update({ ...updatedCheckpoint }, { where: { checkpoint_id: updatedCheckpoint.checkpoint_id } });

      foundCheckpoint = await this.checkpointRepository.findOne({ where: { checkpoint_id: updatedCheckpoint.checkpoint_id } });

      if (foundCheckpoint) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Изменен пункт пропуска #${foundCheckpoint.checkpoint_id}`,
        }
        await this.historyService.create(historyDto);
      }

      return foundCheckpoint;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(checkpoint_id: number, user_id: number): Promise<StatusCheckpointResponse> {
    const deleteCheckpoint = await this.checkpointRepository.destroy({ where: { checkpoint_id } });

    if (deleteCheckpoint) {
      const historyDto = {
        "user_id": user_id,
        "comment": `Удален пункт пропуска #${checkpoint_id}`,
      }
      await this.historyService.create(historyDto);

      return { status: true };
    }

    return { status: false };
  }
}
