import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { FileTypeService } from './file_type.service';
import { CreateFileTypeDto } from './dto/create-file_type.dto';
import { UpdateFileTypeDto } from './dto/update-file_type.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileType } from './entities/file_type.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('file-type')
@Controller('file-type')
export class FileTypeController {
  constructor(private readonly fileTypeService: FileTypeService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создание нового типа файла' })
  @ApiResponse({ status: 201, description: 'Тип файла успешно создан!' })
  create(@Body() createFileTypeDto: CreateFileTypeDto, @Req() request) {
    return this.fileTypeService.create(createFileTypeDto, request.user.user_id);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех типов файла' })
  findAll() {
    return this.fileTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение отдельного типа файла' })
  @ApiResponse({
    status: 200,
    description: 'Найденная запись',
    type: FileType,
  })
  findOne(@Param('id') id: number) {
    return this.fileTypeService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Обновление отдельного типа файла' })
  @ApiResponse({ status: 200, description: 'Тип файла успешно обновлен!' })
  @ApiResponse({ status: 404, description: 'Тип файла не существует!' })
  update(@Body() updateFileTypeDto: UpdateFileTypeDto, @Req() request) {
    return this.fileTypeService.update(updateFileTypeDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление отдельного типа файла' })
  @ApiResponse({ status: 201, description: 'Тип файла успешно удален!' })
  @ApiResponse({ status: 404, description: 'Тип файла не существует!' })
  remove(@Param('id') id: number, @Req() request) {
    return this.fileTypeService.remove(+id, request.user.user_id);
  }
}
