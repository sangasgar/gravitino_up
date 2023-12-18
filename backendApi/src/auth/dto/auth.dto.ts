import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthDto {
    @IsString()
    @ApiProperty()
    login: string;

    @IsString()
    @ApiProperty()
    password: string;
}
