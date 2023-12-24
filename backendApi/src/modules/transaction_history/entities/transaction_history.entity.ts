import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table, Model } from "sequelize-typescript";
import { User } from "src/modules/users/entities/user.entity";

@Table
export class TransactionHistory extends Model<TransactionHistory> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
    history_id;

    @ForeignKey(type => User)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    user_id: number;

    @ApiProperty({
        type: () => User,
        example: {
            user_id: 1,
            role_id: 1,
            login: "login",
            group_id: 1,
            organization_id: 1,
            private_key: "pkey",
            public_key: "pkey",
            deposit: 100,
            balance: 100
        },
        description: 'Данные пользователя'
    })
    @BelongsTo(type => User)
    user: User;

    @Column({ type: DataType.STRING, allowNull: false })
    comment: string;
}
