import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { OrderStatusService } from './order_status.service';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { UpdateOrderStatusDto } from './dto/update-order_status.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderStatus } from './entities/order_status.entity';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('order-status')
@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создание статуса заказа' })
  @ApiResponse({ status: 201, description: 'Статус заказа успешно создан!' })
  create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    return this.orderStatusService.create(createOrderStatusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех статусов заказа' })
  findAll() {
    return this.orderStatusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение отдельного статуса заказа' })
  @ApiResponse({
    status: 200,
    description: 'Найденная запись',
    type: OrderStatus,
  })
  findOne(@Param('id') id: number) {
    return this.orderStatusService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Обновление отдельного статуса заказа' })
  @ApiResponse({ status: 200, description: 'Статус успешно обновлен!' })
  @ApiResponse({ status: 404, description: 'Статус не существует!' })
  @ApiResponse({ status: 403, description: 'Forbidden!' })
  update(@Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    return this.orderStatusService.update(updateOrderStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление отдельного статуса заказа' })
  @ApiResponse({ status: 201, description: 'Статус успешно удален!' })
  @ApiResponse({ status: 404, description: 'Статус не существует!' })
  remove(@Param('id') id: number) {
    return this.orderStatusService.remove(+id);
  }
}
