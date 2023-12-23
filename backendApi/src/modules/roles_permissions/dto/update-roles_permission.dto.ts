import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateRolesPermissionDto {
    @IsInt()
    @IsOptional()
    @ApiProperty()
    role_permission_id?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    role_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    permission_id?: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    rights?: boolean;
}
