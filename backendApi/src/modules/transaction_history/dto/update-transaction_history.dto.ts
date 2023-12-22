import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTransactionHistoryDto } from './create-transaction_history.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTransactionHistoryDto {
    @IsInt()
    @ApiProperty()
    history_id: number;

    @IsOptional()
    @IsInt()
    @ApiProperty()
    user_id?: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    comment?: string;
}
