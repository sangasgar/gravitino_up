import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/modules/users/entities/user.entity";

@Table
export class Role extends Model<Role> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    role_id: number;

    @ApiProperty({ example: 'Заказчик', description: 'Роль пользователя' })
    @Column({ type: DataType.STRING(30), allowNull: false, })
    role_name: string;

    @HasMany(type => User, 'role_id')
    users: NonAttribute<User[]>;
}
