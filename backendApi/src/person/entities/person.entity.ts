import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { Model, Table } from "sequelize-typescript";
import { Column, DataType, HasOne, PrimaryKey } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";

@Table
export class Person extends Model<Person> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    person_id: number;

    @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
    @Column({ type: DataType.STRING(30), allowNull: false, })
    last_name: string;

    @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
    @Column({ type: DataType.STRING(30), allowNull: false, })
    first_name: string;

    @ApiProperty({ example: 'Иванович', description: 'Отчество пользователя' })
    @Column({ type: DataType.STRING(30), defaultValue: '' })
    patronymic: string;

    @ApiProperty({ example: 'Мужской', description: 'Пол пользователя' })
    @Column({ type: DataType.STRING(30) })
    gender: string;

    @ApiProperty({ example: '+79001234567', description: 'Номер телефона пользователя' })
    @Column({ type: DataType.STRING(12) })
    phone: string;

    @HasOne(type => User, 'person_id')
    user: NonAttribute<User>;
}
