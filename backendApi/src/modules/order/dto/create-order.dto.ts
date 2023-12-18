import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    task_id: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    facility_id: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    organization_id: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    executor_id: number;

    @IsInt()
    @ApiProperty()
    creator_id: number;

    @IsInt()
    @ApiProperty()
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
    @ApiProperty()
    priority_id: number;
}
