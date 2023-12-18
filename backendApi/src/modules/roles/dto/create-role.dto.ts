import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @ApiProperty()
    role_name: string;
}