import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsInt, IsString } from "class-validator";

export class UserResponse {
    @IsInt()
    @ApiProperty()
    user_id: number;

    @IsString()
    @ApiProperty()
    last_name: string;

    @IsString()
    @ApiProperty()
    first_name: string;

    @IsString()
    @ApiProperty()
    patronymic?: string;

    @IsString()
    @ApiProperty()
    gender: string;

    @IsString()
    @ApiProperty()
    phone: string;

    @IsInt()
    @ApiProperty({ default: 1 })
    organization_id: number;

    @IsInt()
    @ApiProperty({ default: 1 })
    role_id: number;

    @IsInt()
    @ApiProperty({ default: 1 })
    group_id: number;

    @IsString()
    @ApiProperty()
    login: string;

    @IsString()
    @ApiProperty()
    password: string;
}

export class StatusUserResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}