import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsInt } from "class-validator";

export class RoleResponse {
    @IsInt()
    @ApiProperty()
    role_id: number;

    @IsString()
    @ApiProperty()
    role_name: string;
}

export class StatusRoleResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}