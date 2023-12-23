import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { RolePermission } from "src/modules/roles_permissions/entities/roles_permission.entity";

@Table
export class Permission extends Model<Permission> {
    // @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    // permission_id: number;
    @PrimaryKey
    @ApiProperty({ example: 'user-create', description: 'Действие' })
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    permission_id: string;

    @ApiProperty({ example: 'Organizations', description: 'Название таблицы' })
    @Column({ type: DataType.STRING(30), allowNull: false, })
    entity_name: string;

    @HasMany(type => RolePermission, 'permission_id')
    rolesPermissions: NonAttribute<RolePermission[]>;
}
