import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreatePersonDto {
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
}
