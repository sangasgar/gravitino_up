import { Module } from '@nestjs/common';
import { FileTypeService } from './file_type.service';
import { FileTypeController } from './file_type.controller';
import { FileType } from './entities/file_type.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Report } from 'src/modules/report/entities/report.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { TransactionHistory } from '../transaction_history/entities/transaction_history.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([FileType, Report, TransactionHistory, User])],
  controllers: [FileTypeController],
  providers: [FileTypeService, TransactionHistoryService],
})
export class FileTypeModule { }
