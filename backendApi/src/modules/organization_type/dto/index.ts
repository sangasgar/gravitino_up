import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateOrganizationTypeDto {
    @ApiProperty()
    type_name: string;
}

export class UpdateOrganizationTypeDto {
    @ApiProperty()
    organization_type_id?: number;

    @ApiProperty()
    type_name?: string;
}