import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsDate, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateOrderDto {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    order_id: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    task_id: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    facility_id: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    organization_id: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    executor_id: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    creator_id: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    status_id: number;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    planned_datetime: Date;

    @IsOptional()
    @IsDate()
    @ApiProperty()
    task_end_datetime: Date;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    priority_id: number;
}
