import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePermissionDto {
    @ApiProperty()
    permission_id: string;

    @ApiProperty()
    entity_name: string;
}

export class UpdatePermissionDto {
    @ApiProperty()
    permission_id?: string;

    @ApiProperty()
    entity_name?: string;
}
