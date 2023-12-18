import { Model, Table } from "sequelize-typescript";
import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey } from "sequelize-typescript";
import { User } from "src/modules/users/entities/user.entity";
import { sign } from 'jsonwebtoken';

@Table
export class Auth extends Model<Auth> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    auth_id: number;

    @ForeignKey(type => User)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    user_id: number;

    @BelongsTo(type => User)
    user: User;

    @Column({ type: DataType.STRING, allowNull: false, })
    user_agent: string;

    @Column({ type: DataType.STRING, allowNull: false, })
    ip_address: string;

    sign(): string {
        return sign({ ...this }, process.env.refresh_token);
    }
}
