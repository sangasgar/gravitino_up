import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('order')
@ApiTags('order')
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() request) {
    return this.orderService.create(createOrderDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateOrderDto: UpdateOrderDto, @Req() request) {
    return this.orderService.update(updateOrderDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() request) {
    return this.orderService.remove(+id, request.user.user_id);
  }
}
