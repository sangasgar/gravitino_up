import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Order } from "src/modules/order/entities/order.entity";

@Table
export class OrderStatus extends Model<OrderStatus> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    status_id: number;

    @ApiProperty({ example: 'Выполнено', description: 'Статус заказа' })
    @Column({ type: DataType.STRING(30), allowNull: false })
    status_name: string;

    @HasMany(type => Order, 'status_id')
    orders: NonAttribute<Order[]>;
}