import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateOrganizationTypeDto {
    @IsInt()
    @IsOptional()
    @ApiProperty()
    organization_type_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    type_name?: string;
}
