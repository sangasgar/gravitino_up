import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    last_name: string;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    patronymic?: string;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    phone: string;

    @IsOptional()
    person_id?: number;

    @ApiProperty({ default: 1 })
    organization_id: number;

    @ApiProperty({ default: 1 })
    role_id: number;

    @ApiProperty({ default: 1 })
    group_id?: number;

    @ApiProperty()
    login: string;

    @ApiProperty()
    password: string;
}

export class UpdateUserDto {
    @ApiProperty()
    user_id?: number;

    @ApiProperty()
    last_name?: string;

    @ApiProperty()
    first_name?: string;

    @ApiProperty()
    patronymic?: string;

    @ApiProperty()
    gender?: string;

    @ApiProperty()
    phone?: string;

    @ApiProperty({ default: 1 })
    organization_id?: number;

    @ApiProperty({ default: 1 })
    role_id?: number;

    @ApiProperty({ default: 1 })
    group_id?: number;

    @ApiProperty()
    login?: string;

    @ApiProperty()
    password?: string;
}
