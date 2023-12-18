import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsInt()
    @IsOptional()
    @ApiProperty()
    user_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    last_name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    first_name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    patronymic?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    gender?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    phone?: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({ default: 1 })
    organization_id?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({ default: 1 })
    role_id?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({ default: 1 })
    group_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    login?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    password?: string;
}
