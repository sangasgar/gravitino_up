import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderStatusDto } from './create-order_status.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateOrderStatusDto {
    @IsInt()
    @IsOptional()
    @ApiProperty()
    status_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    status_name?: string;
}
