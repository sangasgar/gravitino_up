import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateReportDto {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty({ default: 1 })
    report_id?: number;

    @IsOptional()
    @IsInt()
    @ApiProperty({ default: 1 })
    report_user_id?: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    file_sku?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    file_alt?: string;

    @IsOptional()
    @IsInt()
    @ApiProperty({ default: 1 })
    file_type_id?: number;

    @IsOptional()
    @ApiProperty()
    report_json?: string;
}
