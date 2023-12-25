import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionHistoryService } from './transaction_history.service';
import { CreateTransactionHistoryDto, UpdateTransactionHistoryDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { AppError } from 'src/common/constants/error';
import { UsersService } from '../users/users.service';

@ApiBearerAuth()
@ApiTags('Transaction History')
@Controller('transaction-history')
export class TransactionHistoryController {
  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
    private readonly userService: UsersService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTransactionHistoryDto: CreateTransactionHistoryDto) {
    if (createTransactionHistoryDto.user_id) {
      const foundUser = await this.userService.findOne(createTransactionHistoryDto.user_id);
      if (!foundUser) {
        throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    return this.transactionHistoryService.create(createTransactionHistoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll() {
    return this.transactionHistoryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateTransactionHistoryDto: UpdateTransactionHistoryDto) {
    let foundTransactionHistory = null;
    if (updateTransactionHistoryDto.history_id) {
      foundTransactionHistory = await this.transactionHistoryService.findOne(updateTransactionHistoryDto.history_id);
    }
    if (!foundTransactionHistory) {
      throw new HttpException(AppError.TRANSACTION_HISTORY_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (updateTransactionHistoryDto.user_id) {
      const foundUser = await this.userService.findOne(updateTransactionHistoryDto.user_id);
      if (!foundUser) {
        throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    return this.transactionHistoryService.update(updateTransactionHistoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const foundTransactionHistory = await this.transactionHistoryService.findOne(id);
    if (foundTransactionHistory == null) {
      throw new HttpException(AppError.TRANSACTION_HISTORY_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.transactionHistoryService.remove(+id);
  }
}
