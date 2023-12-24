import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionHistoryDto } from './dto/create-transaction_history.dto';
import { UpdateTransactionHistoryDto } from './dto/update-transaction_history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/modules/users/entities/user.entity';
import { TransactionHistory } from './entities/transaction_history.entity';
import { AppError } from 'src/common/constants/error';
import { AppStrings } from 'src/common/constants/strings';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectModel(TransactionHistory) private historyRepository: typeof TransactionHistory,
    @InjectModel(User) private userRepository: typeof User,
  ) { }

  async create(createTransactionHistoryDto: CreateTransactionHistoryDto) {
    const user = await this.userRepository.findOne({ where: { user_id: createTransactionHistoryDto.user_id } });
    if (!user) {
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    const result = await this.historyRepository.create(createTransactionHistoryDto).catch((error) => {
      let errorMessage = error.message;
      let errorCode = HttpStatus.BAD_REQUEST;

      throw new HttpException(errorMessage, errorCode);
    });

    return result;
  }

  async findAll() {
    const result = await this.historyRepository.findAll();

    return result;
  }

  async findOne(id: number) {
    const result = await this.historyRepository.findOne({
      where: { history_id: id }
    });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: AppError.TRANSACTION_HISTORY_NOT_FOUND
        }
      )
    } else {
      return result;
    }
  }

  async update(updateTransactionHistoryDto: UpdateTransactionHistoryDto) {
    const history = await this.historyRepository.findOne({ where: { user_id: updateTransactionHistoryDto.history_id } });
    if (!history) {
      throw new HttpException(AppError.TRANSACTION_HISTORY_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const user = await this.userRepository.findOne({ where: { user_id: updateTransactionHistoryDto.user_id } });
    if (!user) {
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    const result = await history.update(updateTransactionHistoryDto).catch((error) => {
      let errorMessage = error.message;
      let errorCode = HttpStatus.BAD_REQUEST;

      throw new HttpException(errorMessage, errorCode);
    });

    return result;
  }

  async remove(id: number) {
    const result = await this.historyRepository.findOne({
      where: { history_id: id }
    });

    if (result == null) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: AppError.TRANSACTION_HISTORY_NOT_FOUND
        }
      )
    } else {
      await this.historyRepository.destroy({ where: { history_id: id } });

      return { statusCode: 200, message: AppStrings.SUCCESS_ROW_DELETE };
    }
  }
}
