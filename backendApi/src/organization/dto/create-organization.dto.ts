import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class CreateOrganizationDto {
    @IsInt()
    @ApiProperty({ default: 1 })
    organization_type_id: number;

    @IsString()
    @ApiProperty()
    organization_name: string;

    @IsString()
    @ApiProperty()
    phone: string;

    @IsString()
    @ApiProperty()
    address: string;

    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    ogrn: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    inn: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    kpp: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    okpo: string;
}
