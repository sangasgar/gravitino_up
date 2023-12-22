import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, Query, UseInterceptors, Res, StreamableFile, UseGuards, Req } from '@nestjs/common';
import { ReportService } from './report.service';
import { Express, Response } from 'express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { JwtAuthGuard } from 'src/modules/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReportDto: CreateReportDto, @Req() request) {
    return this.reportService.create(createReportDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateReportDto: UpdateReportDto, @Req() request) {
    return this.reportService.update(updateReportDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request) {
    return this.reportService.remove(+id, request.user.user_id);
  }
}
