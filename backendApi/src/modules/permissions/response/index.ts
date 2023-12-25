import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsInt } from "class-validator";

export class PermissionResponse {
    @IsString()
    @ApiProperty()
    permission_id: string;

    @IsString()
    @ApiProperty()
    entity_name: string;
}

export class StatusPermissionResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}