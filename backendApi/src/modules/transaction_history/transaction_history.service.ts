import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionHistoryDto, UpdateTransactionHistoryDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { TransactionHistory } from './entities/transaction_history.entity';
import { StatusTransactionHistoryResponse, TransactionHistoryResponse } from './response';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectModel(TransactionHistory) private historyRepository: typeof TransactionHistory,
    @InjectModel(User) private userRepository: typeof User,
  ) { }

  async create(createTransactionHistoryDto: CreateTransactionHistoryDto): Promise<TransactionHistoryResponse> {
    try {
      const newHistory = await this.historyRepository.create(createTransactionHistoryDto);

      return newHistory;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<TransactionHistoryResponse[]> {
    try {
      const foundHistories = await this.historyRepository.findAll();
      return foundHistories;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(history_id: number): Promise<boolean> {
    try {
      const result = await this.historyRepository.findOne({ where: { history_id } });

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(updateTransactionHistoryDto: UpdateTransactionHistoryDto): Promise<TransactionHistoryResponse> {
    try {
      let foundHistory = null;
      await this.historyRepository.update({ ...updateTransactionHistoryDto }, { where: { history_id: updateTransactionHistoryDto.history_id } });

      foundHistory = await this.historyRepository.findOne({ where: { history_id: updateTransactionHistoryDto.history_id } });

      return foundHistory;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(history_id: number): Promise<StatusTransactionHistoryResponse> {
    try {
      const deleteHistory = await this.historyRepository.destroy({ where: { history_id } });

      if (deleteHistory) {
        return { status: true };
      }

      return { status: false };
    } catch (error) {
      throw new Error(error);
    }
  }
}
