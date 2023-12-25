import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsInt, IsString } from "class-validator";

export class OrganizationTypeResponse {
    @IsInt()
    @ApiProperty()
    organization_type_id: number;

    @IsString()
    @ApiProperty()
    type_name: string;
}

export class StatusOrganizationTypeResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}