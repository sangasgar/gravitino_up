import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class CreateOrganizationDto {
    @ApiProperty({ default: 1 })
    organization_type_id: number;

    @ApiProperty()
    organization_name: string;

    @ApiProperty()
    full_name: string;

    @ApiProperty()
    short_name: string;

    @ApiProperty()
    register_number: string;

    @ApiProperty()
    bic: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    ogrn: string;

    @ApiProperty()
    inn: string;

    @ApiProperty()
    kpp: string;

    @ApiProperty()
    okpo: string;
}

export class UpdateOrganizationDto {
    @ApiProperty()
    organization_id?: number;

    @ApiProperty()
    organization_type_id?: number;

    @ApiProperty()
    organization_name?: string;

    @ApiProperty()
    full_name?: string;

    @ApiProperty()
    short_name?: string;

    @ApiProperty()
    register_number?: string;

    @ApiProperty()
    bic?: string;

    @ApiProperty()
    phone?: string;

    @ApiProperty()
    address?: string;

    @ApiProperty()
    email?: string;

    @ApiProperty()
    ogrn?: string;

    @ApiProperty()
    inn?: string;

    @ApiProperty()
    kpp?: string;

    @ApiProperty()
    okpo?: string;
}
