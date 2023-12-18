import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto {
    @IsInt()
    @IsOptional()
    @ApiProperty()
    group_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    group_name?: string;
}
