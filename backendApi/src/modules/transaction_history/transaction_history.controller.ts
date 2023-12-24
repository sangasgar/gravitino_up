import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionHistoryService } from './transaction_history.service';
import { CreateTransactionHistoryDto } from './dto/create-transaction_history.dto';
import { UpdateTransactionHistoryDto } from './dto/update-transaction_history.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Transaction History')
@Controller('transaction-history')
export class TransactionHistoryController {
  constructor(private readonly transactionHistoryService: TransactionHistoryService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTransactionHistoryDto: CreateTransactionHistoryDto) {
    return this.transactionHistoryService.create(createTransactionHistoryDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll() {
    return this.transactionHistoryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateTransactionHistoryDto: UpdateTransactionHistoryDto) {
    return this.transactionHistoryService.update(updateTransactionHistoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionHistoryService.remove(+id);
  }
}
