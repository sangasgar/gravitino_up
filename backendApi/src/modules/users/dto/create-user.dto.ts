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
