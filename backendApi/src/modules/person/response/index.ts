import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class PersonResponse {
    @IsInt()
    @ApiProperty()
    person_id: number;

    @IsString()
    @ApiProperty()
    last_name: string;

    @IsString()
    @ApiProperty()
    first_name: string;

    @IsString()
    @ApiProperty()
    patronymic: string;

    @IsString()
    @ApiProperty()
    gender: string;

    @IsString()
    @ApiProperty()
    phone: string;
}

export class StatusPersonResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}