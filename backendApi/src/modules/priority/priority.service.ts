import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePriorityDto, UpdatePriorityDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderPriority } from './entities/priority.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { Sequelize } from 'sequelize-typescript';
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';
import { OrderPriorityResponse, StatusOrderPriorityResponse } from './response';

@Injectable()
export class PriorityService {
  constructor(
    @InjectModel(OrderPriority) private orderPriorityRepository: typeof OrderPriority,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(createPriorityDto: CreatePriorityDto, user_id: number): Promise<OrderPriorityResponse> {
    try {
      const newPriority = await this.orderPriorityRepository.create(createPriorityDto);

      const historyDto = {
        "user_id": user_id,
        "comment": `Создан приоритет #${newPriority.priority_id}`,
      }
      await this.historyService.create(historyDto);

      return newPriority;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<OrderPriorityResponse[]> {
    try {
      const foundPriorities = await this.orderPriorityRepository.findAll();
      return foundPriorities;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<boolean> {
    try {
      const result = await this.orderPriorityRepository.findOne({ where: { priority_id: id } });

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(updatePriorityDto: UpdatePriorityDto, user_id: number): Promise<OrderPriorityResponse> {
    try {
      let foundPriority = null;
      await this.orderPriorityRepository.update({ ...updatePriorityDto }, { where: { priority_id: updatePriorityDto.priority_id } });

      foundPriority = await this.orderPriorityRepository.findOne({ where: { priority_id: updatePriorityDto.priority_id } });

      if (foundPriority) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Изменен приоритет #${foundPriority.priority_id}`,
        }
        await this.historyService.create(historyDto);
      }

      return foundPriority;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(priority_id: number, user_id: number): Promise<StatusOrderPriorityResponse> {
    try {
      const deletePriority = await this.orderPriorityRepository.destroy({ where: { priority_id } });

      if (deletePriority) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Удален приоритет #${priority_id}`,
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
