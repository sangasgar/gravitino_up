import { Module } from '@nestjs/common';
import { FileTypeService } from './file_type.service';
import { FileTypeController } from './file_type.controller';
import { FileType } from './entities/file_type.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';

@Module({
  imports: [SequelizeModule.forFeature([FileType]), TransactionHistoryModule],
  controllers: [FileTypeController],
  providers: [FileTypeService],
})
export class FileTypeModule { }
