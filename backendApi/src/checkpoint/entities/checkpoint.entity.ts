import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Facility } from "src/facility/entities/facility.entity";
import { Organization } from "src/organization/entities/organization.entity";

@Table
export class Checkpoint extends Model<Checkpoint> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    checkpoint_id: number;

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

    @ApiProperty({ example: 'Пункт пропуска №1', description: 'Название пункта пропуска' })
    @Column({ type: DataType.STRING(30), allowNull: false, })
    checkpoint_name: string;

    @ApiProperty({ example: 'г. Москва', description: 'Местоположение пункта пропуска' })
    @Column({ type: DataType.STRING, allowNull: false, })
    location: string;

    @HasMany(type => Facility, 'checkpoint_id')
    facilities: NonAttribute<Facility[]>;
}
