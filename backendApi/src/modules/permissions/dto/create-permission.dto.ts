import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePermissionDto {
    @IsString()
    @ApiProperty()
    permission_id: string;

    @IsString()
    @ApiProperty()
    entity_name: string;
}
