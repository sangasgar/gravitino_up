import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class CreateRolesPermissionDto {
    @IsInt()
    @ApiProperty()
    role_id: number;

    @IsInt()
    @ApiProperty()
    permission_id: number;

    @IsBoolean()
    @ApiProperty()
    rights: boolean;
}
