import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsInt } from "class-validator";

export class OrderResponse {
    @IsInt()
    @ApiProperty({ default: 1 })
    task_id: number;

    @IsInt()
    @ApiProperty({ default: 1 })
    facility_id: number;

    @IsInt()
    @ApiProperty({ default: 1 })
    organization_id: number;

    @IsInt()
    @ApiProperty({ default: 1 })
    executor_id: number;

    @IsInt()
    @ApiProperty({ default: 1 })
    creator_id: number;

    @IsInt()
    @ApiProperty({ default: 1 })
    status_id: number;

    @IsDate()
    @ApiProperty()
    planned_datetime: Date;

    @IsDate()
    @ApiProperty()
    task_end_datetime: Date;

    @IsInt()
    @ApiProperty({ default: 1 })
    priority_id: number;
}

export class StatusOrderResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}