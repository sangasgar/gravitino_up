import { ApiProperty } from '@nestjs/swagger';
import { NonAttribute } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Group } from 'src/modules/group/entities/group.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { Person } from 'src/modules/person/entities/person.entity';
import { OrderPriority } from 'src/modules/priority/entities/priority.entity';
import { Report } from 'src/modules/report/entities/report.entity';
import { Role } from 'src/modules/roles/entities/role.entity';

@Table
export class User extends Model<User> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    user_id: number;

    @ForeignKey(type => Person)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    person_id: number;

    @ApiProperty({
        type: () => Person,
        example: {
            person_id: 1,
            last_name: 'Иванов',
            first_name: 'Иван',
            patronymic: 'Иванович',
            gender: 'Мужской'
        },
        description: 'Данные пользователя'
    })
    @BelongsTo(type => Person)
    person: Person;

    @ForeignKey(type => Organization)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    organization_id: number;

    @ApiProperty({
        type: () => Organization,
        example: {
            organization_id: 1,
            organization_name: 'ООО',
            phone: '79001234567',
            address: 'г. Москва',
            email: 'email@example.com',
            ogrn: '',
            inn: '',
            kpp: '',
            okpo: ''
        },
        description: 'Организация'
    })
    @BelongsTo(type => Organization)
    organization: Organization;

    @ForeignKey(type => Role)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    role_id: number;

    @ApiProperty({ example: { role_id: 1, role_name: 'Пользователь' }, description: 'Роль пользователя (исполнитель, заказчик, администратор и т.д.)' })
    @BelongsTo(type => Role)
    role: Role;

    @ForeignKey(type => Group)
    @Column({ type: DataType.INTEGER, allowNull: true, })
    group_id: number;

    @ApiProperty({ example: { group_id: 1, group_name: 'Группа №1' }, description: 'Группа пользователя' })
    @BelongsTo(type => Group)
    group: Group;

    @ApiProperty({ example: 'login', description: 'Логин пользователя' })
    @Column({ type: DataType.STRING(30), allowNull: false, unique: true })
    login: string;

    @Column({ type: DataType.STRING, allowNull: false, })
    password: string;

    @HasMany(type => Auth, 'user_id')
    users: NonAttribute<Auth[]>;

    @HasMany(type => Report, 'report_user_id')
    reports: Report[];

    @HasMany(type => Order, 'creator_id')
    order_creators: NonAttribute<Order[]>;

    @HasMany(type => Order, 'executor_id')
    order_executors: NonAttribute<Order[]>;
}