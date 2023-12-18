import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class OrderStatus extends Model<OrderStatus> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    status_id: number;

    @ApiProperty({ example: 'Выполнено', description: 'Статус заказа' })
    @Column({ type: DataType.STRING(30), allowNull: false })
    status_name: string;

    // @OneToMany(type => Task, task => task.status)
    // tasks: Task[];
}
