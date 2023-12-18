import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/modules/users/entities/user.entity";

@Table
export class Group extends Model<Group> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    group_id: number;

    @ApiProperty({ example: 'Группа №1', description: 'Название группы' })
    @Column({ type: DataType.STRING(30), allowNull: false, })
    group_name: string;

    @HasMany(type => User, 'group_id')
    users: NonAttribute<User[]>;
}
