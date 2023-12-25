import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class RolePermissionResponse {
    @IsInt()
    @ApiProperty()
    role_permission_id: number;

    @IsInt()
    @ApiProperty()
    role_id: number;

    @IsString()
    @ApiProperty()
    permission_id: string;

    @IsBoolean()
    @ApiProperty()
    rights: boolean;
}

export class StatusRolePermissionResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}