import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdatePermissionDto {
    @IsInt()
    @IsOptional()
    @ApiProperty()
    permission_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    action_name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    entity_name?: string;
}
