import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Task } from "src/task/entities/task.entity";

@Table
export class Category extends Model<Category> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    category_id: number;

    @ApiProperty({ example: 'Заказчик', description: 'Роль пользователя' })
    @Column({ type: DataType.STRING(30), allowNull: false, })
    category_name: string;

    @HasMany(type => Task, 'category_id')
    tasks: NonAttribute<Task[]>;
}