import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @ApiProperty()
    last_name: string;

    @IsString()
    @ApiProperty()
    first_name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    patronymic: string;

    @IsString()
    @ApiProperty()
    gender: string;

    @IsString()
    @ApiProperty()
    phone: string;

    @IsInt()
    @IsOptional()
    person_id?: number;

    @IsInt()
    @ApiProperty({ default: 1 })
    organization_id: number;

    @IsInt()
    @ApiProperty({ default: 1 })
    role_id: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({ default: 1 })
    group_id: number;

    @IsString()
    @ApiProperty()
    login: string;

    @IsString()
    @ApiProperty()
    password: string;
}

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
