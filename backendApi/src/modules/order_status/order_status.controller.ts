import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { OrderStatusService } from './order_status.service';
import { CreateOrderStatusDto, UpdateOrderStatusDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AppError } from 'src/common/constants/error';

@ApiBearerAuth()
@ApiTags('order-status')
@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создание статуса заказа' })
  @ApiResponse({ status: 201, description: 'Статус заказа успешно создан!' })
  async create(@Body() createOrderStatusDto: CreateOrderStatusDto, @Req() request) {
    return this.orderStatusService.create(createOrderStatusDto, request.user.user_id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Получение всех статусов заказа' })
  async findAll() {
    return this.orderStatusService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Обновление отдельного статуса заказа' })
  @ApiResponse({ status: 200, description: 'Статус успешно обновлен!' })
  @ApiResponse({ status: 404, description: 'Статус не существует!' })
  @ApiResponse({ status: 403, description: 'Forbidden!' })
  async update(@Body() updateOrderStatusDto: UpdateOrderStatusDto, @Req() request) {
    let foundStatus = null;
    if (updateOrderStatusDto.status_id) {
      foundStatus = await this.orderStatusService.findOne(updateOrderStatusDto.status_id);
    }

    if (!foundStatus) {
      throw new HttpException(AppError.ORDER_STATUS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.orderStatusService.update(updateOrderStatusDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление отдельного статуса заказа' })
  @ApiResponse({ status: 201, description: 'Статус успешно удален!' })
  @ApiResponse({ status: 404, description: 'Статус не существует!' })
  async remove(@Param('id') id: number, @Req() request) {
    const foundStatus = await this.orderStatusService.findOne(id);
    if (!foundStatus) {
      throw new HttpException(AppError.ORDER_STATUS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.orderStatusService.remove(+id, request.user.user_id);
  }
}
