import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty({ default: 1 })
    task_id: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({ default: 1 })
    facility_id: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({ default: 1 })
    organization_id: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({ default: 1 })
    executor_id: number;

    @IsInt()
    @ApiProperty({ default: 1 })
    creator_id: number;

    @IsInt()
    @ApiProperty({ default: 1 })
    status_id: number;

    @IsNotEmpty()
    @IsDate()
    @ApiProperty()
    planned_datetime: Date;

    @IsNotEmpty()
    @IsDate()
    @ApiProperty()
    task_end_datetime: Date;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({ default: 1 })
    priority_id: number;
}
