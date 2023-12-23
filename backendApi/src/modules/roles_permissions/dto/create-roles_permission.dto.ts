import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class CreateRolesPermissionDto {
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
