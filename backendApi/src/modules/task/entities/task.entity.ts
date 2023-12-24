import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Category } from "src/modules/category/entities/category.entity";
import { Order } from "src/modules/order/entities/order.entity";

@Table
export class Task extends Model<Task> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    task_id: number;

    @ForeignKey(type => Category)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    category_id: number;

    @ApiProperty({ example: { category_id: 1, category_name: 'Уборка' }, description: 'Категория задачи' })
    @BelongsTo(type => Category)
    category: Category;

    @ApiProperty({ example: 'Уборка санузлов', description: 'Вид работы' })
    @Column({ type: DataType.STRING(30), allowNull: false, })
    work_type: string;

    @ApiProperty({ example: 'Описание вида работы', description: 'Описание вида работы' })
    @Column({ type: DataType.STRING(500), allowNull: false, defaultValue: '' })
    work_type_description: string;

    @ApiProperty({ example: 'Описание задачи', description: 'Описание задачи' })
    @Column({ type: DataType.STRING(500), allowNull: false, defaultValue: '' })
    task_description: string;

    @ApiProperty({ example: '90 кв.м.', description: 'Площадь помещения/здания' })
    @Column({ type: DataType.STRING(500), allowNull: false, defaultValue: '' })
    area: string;

    @HasMany(type => Order, 'task_id')
    orders: NonAttribute<Order[]>;
}
