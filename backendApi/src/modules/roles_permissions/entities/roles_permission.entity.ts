import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Permission } from "src/modules/permissions/entities/permission.entity";
import { Role } from "src/modules/roles/entities/role.entity";

@Table
export class RolePermission extends Model<RolePermission> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    role_permission_id: number;

    @ForeignKey(type => Role)
    @Column({ type: DataType.INTEGER, allowNull: false })
    role_id: number;

    @ApiProperty({ example: { role_id: 1, role_name: 'Пользователь' }, description: 'Роль пользователя (пользователь, администратор и т.д.)' })
    @BelongsTo(type => Role)
    role: Role;

    @ForeignKey(type => Permission)
    @Column({ type: DataType.STRING, allowNull: false, })
    permission_id: string;

    @ApiProperty({ type: Permission, example: { permission_id: 1, action_name: 'users-create', entity_name: 'Users', }, description: 'Разрешение' })
    @BelongsTo(type => Permission)
    permission: Permission;

    @ApiProperty({ type: Permission, example: true, description: 'Статус разрешения' })
    @Column({ type: DataType.BOOLEAN, allowNull: false, })
    rights: boolean;
}
