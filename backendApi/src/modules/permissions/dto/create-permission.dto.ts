import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePermissionDto {
    @IsString()
    @ApiProperty()
    action_name: string;

    @IsString()
    @ApiProperty()
    entity_name: string;
}
