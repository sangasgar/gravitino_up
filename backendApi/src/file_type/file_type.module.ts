import { Module } from '@nestjs/common';
import { FileTypeService } from './file_type.service';
import { FileTypeController } from './file_type.controller';
import { FileType } from './entities/file_type.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Report } from 'src/report/entities/report.entity';

@Module({
  imports: [SequelizeModule.forFeature([FileType, Report])],
  controllers: [FileTypeController],
  providers: [FileTypeService],
})
export class FileTypeModule { }
