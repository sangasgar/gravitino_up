import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { FileTypeService } from './file_type.service';
import { CreateFileTypeDto, UpdateFileTypeDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AppError } from 'src/common/constants/error';

@ApiBearerAuth()
@ApiTags('file-type')
@Controller('file-type')
export class FileTypeController {
  constructor(private readonly fileTypeService: FileTypeService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создание нового типа файла' })
  @ApiResponse({ status: 201, description: 'Тип файла успешно создан!' })
  async create(@Body() createFileTypeDto: CreateFileTypeDto, @Req() request) {
    return this.fileTypeService.create(createFileTypeDto, request.user.user_id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Получение всех типов файла' })
  async findAll() {
    return this.fileTypeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Обновление отдельного типа файла' })
  @ApiResponse({ status: 200, description: 'Тип файла успешно обновлен!' })
  @ApiResponse({ status: 404, description: 'Тип файла не существует!' })
  async update(@Body() updateFileTypeDto: UpdateFileTypeDto, @Req() request) {
    let foundFileType = null;
    if (updateFileTypeDto.file_type_id) {
      foundFileType = await this.fileTypeService.findOne(updateFileTypeDto.file_type_id);
    }
    if (!foundFileType) {
      throw new HttpException(AppError.FILE_TYPE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.fileTypeService.update(updateFileTypeDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление отдельного типа файла' })
  @ApiResponse({ status: 201, description: 'Тип файла успешно удален!' })
  @ApiResponse({ status: 404, description: 'Тип файла не существует!' })
  async remove(@Param('id') id: number, @Req() request) {
    const foundFileType = await this.fileTypeService.findOne(id);
    if (!foundFileType) {
      throw new HttpException(AppError.FILE_TYPE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.fileTypeService.remove(+id, request.user.user_id);
  }
}
