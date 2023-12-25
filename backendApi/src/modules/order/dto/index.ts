import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty({ default: 1 })
    task_id: number;

    @ApiProperty({ default: 1 })
    facility_id: number;

    @ApiProperty({ default: 1 })
    organization_id: number;

    @ApiProperty({ default: 1 })
    executor_id: number;

    @ApiProperty({ default: 1 })
    creator_id: number;

    @ApiProperty({ default: 1 })
    status_id: number;

    @ApiProperty()
    planned_datetime: Date;

    @ApiProperty()
    task_end_datetime: Date;

    @ApiProperty({ default: 1 })
    priority_id: number;
}

export class UpdateOrderDto {
    @ApiProperty()
    order_id?: number;

    @ApiProperty()
    task_id?: number;

    @ApiProperty()
    facility_id?: number;

    @ApiProperty()
    organization_id?: number;

    @ApiProperty()
    executor_id?: number;

    @ApiProperty()
    creator_id?: number;

    @ApiProperty()
    status_id?: number;

    @ApiProperty()
    planned_datetime?: Date;

    @ApiProperty()
    task_end_datetime?: Date;

    @ApiProperty()
    priority_id?: number;
}
