import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './entities/group.entity';
import { Sequelize } from 'sequelize-typescript';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group) private groupRepository: typeof Group,
    private readonly historyService: TransactionHistoryService,
    private readonly sequelize: Sequelize,
  ) { }

  async create(group: CreateGroupDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      result = await this.groupRepository.create(group, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Создана группа #${result.group_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return result;
  }

  async findAll() {
    return await this.groupRepository.findAll();
  }

  async findOne(group_id: number) {
    const result = await this.groupRepository.findOne({ where: { group_id } });

    if (result == null) {
      throw new HttpException('Группа не найдена!', HttpStatus.NOT_FOUND)
    } else {
      return result;
    }
  }

  async update(updatedGroup: UpdateGroupDto, user_id: number) {
    let result;

    await this.sequelize.transaction(async trx => {
      const transactionHost = { transaction: trx };

      const group_id = updatedGroup.group_id;
      const foundObject = await this.groupRepository.findOne({ where: { group_id } });

      if (foundObject == null) {
        throw new HttpException('Группа не найдена!', HttpStatus.NOT_FOUND)
      }

      await foundObject.update(updatedGroup, transactionHost).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Изменена группа #${result.group_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return result;
  }

  async remove(group_id: number, user_id: number) {
    await this.sequelize.transaction(async trx => {
      const result = await this.groupRepository.findOne({ where: { group_id } });

      if (result == null) {
        throw new HttpException('Группа не найдена!', HttpStatus.BAD_REQUEST)
      }

      await this.groupRepository.destroy({ where: { group_id }, transaction: trx }).catch((error) => {
        let errorMessage = error.message;
        let errorCode = HttpStatus.BAD_REQUEST;

        throw new HttpException(errorMessage, errorCode);
      });

      const historyDto = {
        "user_id": user_id,
        "comment": `Удалена группа #${result.group_id}`,
      }
      await this.historyService.create(historyDto);
    })

    return { statusCode: 200, message: 'Строка успешно удалена!' };
  }
}
