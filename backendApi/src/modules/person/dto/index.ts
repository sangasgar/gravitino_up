import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreatePersonDto {
    @ApiProperty()
    last_name: string;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    patronymic: string;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    phone: string;
}

export class UpdatePersonDto {
    @ApiProperty()
    person_id?: number;

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
}
