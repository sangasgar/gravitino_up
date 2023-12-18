import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileType } from 'src/modules/file_type/entities/file_type.entity';
import { Report } from './entities/report.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Report, FileType, User])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule { }
