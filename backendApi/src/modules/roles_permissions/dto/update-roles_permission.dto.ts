import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional } from "class-validator";

export class UpdateRolesPermissionDto {
    @IsInt()
    @IsOptional()
    @ApiProperty()
    role_permission_id?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    role_id?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    permission_id?: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    rights?: boolean;
}
