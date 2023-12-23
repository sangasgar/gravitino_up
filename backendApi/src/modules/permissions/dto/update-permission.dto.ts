import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdatePermissionDto {
    @IsString()
    @ApiProperty()
    permission_id?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    entity_name?: string;
}
