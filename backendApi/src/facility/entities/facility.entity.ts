import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Checkpoint } from "src/checkpoint/entities/checkpoint.entity";

@Table
export class Facility extends Model<Facility> {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    facility_id: number;

    @ForeignKey(type => Checkpoint)
    @Column({ type: DataType.INTEGER, allowNull: false, })
    checkpoint_id: number;

    @ApiProperty({
        type: () => Checkpoint,
        example: {
            checkpoint_id: 1,
            checkpoint_name: 'ПП №1',
            location: 'г. Москва'
        },
        description: 'Пункт пропуска'
    })
    @BelongsTo(type => Checkpoint)
    checkpoint: Checkpoint;

    @ApiProperty({ example: 'Объект обслуживания №1', description: 'Название объекта обслуживания' })
    @Column({ type: DataType.STRING(30), allowNull: false, })
    facility_name: string;

    @ApiProperty({ example: 'г. Москва', description: 'Местоположение пункта пропуска' })
    @Column({ type: DataType.STRING, allowNull: false, })
    location: string;
}