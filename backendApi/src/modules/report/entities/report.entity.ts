import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { FileType } from "src/modules/file_type/entities/file_type.entity";
import { User } from "src/modules/users/entities/user.entity";

@Table
export class Report extends Model<Report> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    report_id: number;

    @ForeignKey(type => User)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    report_user_id: number;

    @BelongsTo(type => User)
    report_user: User;

    @Column({ type: DataType.STRING, allowNull: false })
    file_sku: string;

    @ApiProperty({ example: 'file', description: 'Название файла' })
    @Column({ type: DataType.STRING, allowNull: false })
    file_alt: string;

    @ForeignKey(type => FileType)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    file_type_id: number;

    @ApiProperty({ example: { type: () => FileType, file_type_id: 1, file_type_name: 'Документ' }, description: 'Тип файла' })
    @BelongsTo(type => FileType)
    file_type: FileType;

    @Column({ type: DataType.JSON, allowNull: false })
    report_json: string;
}
