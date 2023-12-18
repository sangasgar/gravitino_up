import { Injectable } from '@nestjs/common';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { InjectModel } from '@nestjs/sequelize';
import { OrderPriority } from './entities/priority.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class PriorityService {
  constructor(
    @InjectModel(OrderPriority) private orderStatusRepository: typeof OrderPriority
  ) { }

  async create(createPriorityDto: CreatePriorityDto) {
    var newOrderPriority = await this.orderStatusRepository.create(createPriorityDto);

    return newOrderPriority;
  }

  async findAll() {
    const result = await this.orderStatusRepository.findAll({})

    return result;
  }

  async findOne(id: number) {
    const result = await this.orderStatusRepository.findOne({ where: { priority_id: id } })

    return result;
  }

  async update(id: number, updatePriorityDto: UpdatePriorityDto) {
    const orderPriority = await this.orderStatusRepository.findOne({ where: { priority_id: id } })
    var newOrderPriority = await orderPriority.update(updatePriorityDto);

    return newOrderPriority;
  }

  async remove(id: number) {
    await this.orderStatusRepository.destroy({ where: { priority_id: id } })

    return "Запись удалена!"
  }
}
