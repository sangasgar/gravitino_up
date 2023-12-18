import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdatePersonDto {
    @IsInt()
    @ApiProperty()
    person_id?: number;

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
}
