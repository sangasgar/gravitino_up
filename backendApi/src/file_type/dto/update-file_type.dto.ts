import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFileTypeDto } from './create-file_type.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateFileTypeDto {
    @IsInt()
    @IsOptional()
    @ApiProperty()
    file_type_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    type_name?: string;
}
