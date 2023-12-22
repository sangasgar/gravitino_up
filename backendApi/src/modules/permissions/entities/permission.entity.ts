import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { RolePermission } from "src/modules/roles_permissions/entities/roles_permission.entity";

@Table
export class Permission extends Model<Permission> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    permission_id: number;

    @ApiProperty({ example: '', description: 'Действие' })
    @Column({ type: DataType.STRING(30), allowNull: false, unique: true })
    action_name: string;

    @ApiProperty({ example: 'Organizations', description: 'Название таблицы' })
    @Column({ type: DataType.STRING(30), allowNull: false, })
    entity_name: string;

    @HasMany(type => RolePermission, 'permission_id')
    rolesPermissions: NonAttribute<RolePermission[]>;
}
