import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class OrderPriority extends Model<OrderPriority> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    priority_id: number;

    @ApiProperty({ example: 'Ежедневно' })
    @Column({ type: DataType.STRING(30), allowNull: false })
    priority_name: string;

    // @OneToMany(type => Task, task => task.priority)
    // tasks: Task[];
}
