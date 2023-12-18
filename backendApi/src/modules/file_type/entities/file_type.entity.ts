import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { HasMany, Model } from "sequelize-typescript";
import { Column, DataType, PrimaryKey, Table } from "sequelize-typescript";
import { Report } from "src/modules/report/entities/report.entity";

@Table
export class FileType extends Model<FileType> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    file_type_id: number;

    @ApiProperty({ example: 'Фотография', description: 'Тип файла' })
    @Column({ type: DataType.STRING(30), allowNull: false, })
    type_name: string;

    @HasMany(type => Report, 'file_type_id')
    reports: NonAttribute<Report[]>;
}
