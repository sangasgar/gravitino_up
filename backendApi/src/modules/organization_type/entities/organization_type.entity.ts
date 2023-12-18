import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Organization } from "src/modules/organization/entities/organization.entity";

@Table
export class OrganizationType extends Model<OrganizationType> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    organization_type_id: number;

    @ApiProperty({ example: 'Филиал, подрядная организация и т.д.', description: 'Тип организации' })
    @Column({ type: DataType.STRING(30), allowNull: false, })
    type_name: string;

    @HasMany(type => Organization, 'organization_type_id')
    organizations: NonAttribute<Organization[]>;
}
