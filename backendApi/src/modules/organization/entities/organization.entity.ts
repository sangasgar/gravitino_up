import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Checkpoint } from "src/modules/checkpoint/entities/checkpoint.entity";
import { Order } from "src/modules/order/entities/order.entity";
import { OrganizationType } from "src/modules/organization_type/entities/organization_type.entity";
import { User } from "src/modules/users/entities/user.entity";

@Table
export class Organization extends Model<Organization> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    organization_id: number;

    @ForeignKey(type => OrganizationType)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    organization_type_id: number;

    @ApiProperty({
        type: () => OrganizationType,
        example: {
            organization_type_id: 1,
            type_name: 'Филиал',
        },
        description: 'Тип организации'
    })
    @BelongsTo(type => OrganizationType)
    organization_type: OrganizationType;

    @ApiProperty({ example: 'ООО "Компания"', description: 'Название организации' })
    @Column({ type: DataType.STRING(30), allowNull: false, })
    organization_name: string;

    @ApiProperty({ example: '79001234567', description: 'Номер телефона организации' })
    @Column({ type: DataType.STRING, allowNull: false })
    phone: string;

    @ApiProperty({ example: 'г. Москва', description: 'Юридический адрес организации' })
    @Column({ type: DataType.STRING, allowNull: false })
    address: string;

    @ApiProperty({ example: '0', description: 'Email организации' })
    @Column({ type: DataType.STRING, allowNull: true, defaultValue: '' })
    email: string;

    @ApiProperty({ example: '0', description: 'ОГРН организации' })
    @Column({ type: DataType.STRING, allowNull: true, defaultValue: '' })
    ogrn: string;

    @ApiProperty({ example: '0', description: 'ИНН организации' })
    @Column({ type: DataType.STRING, allowNull: true, defaultValue: '' })
    inn: string;

    @ApiProperty({ example: '0', description: 'КПП организации' })
    @Column({ type: DataType.STRING, allowNull: true, defaultValue: '' })
    kpp: string;

    @ApiProperty({ example: '0', description: 'ОКПО организации' })
    @Column({ type: DataType.STRING, allowNull: true, defaultValue: '' })
    okpo: string;

    @HasMany(type => User, 'organization_id')
    users: NonAttribute<User[]>;

    @HasMany(type => Checkpoint, 'organization_id')
    checkpoints: NonAttribute<Checkpoint[]>;

    @HasMany(type => Order, 'organization_id')
    orders: NonAttribute<Order[]>;
}
