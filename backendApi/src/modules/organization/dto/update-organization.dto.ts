import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateOrganizationDto {
    @IsInt()
    @IsOptional()
    @ApiProperty()
    organization_id?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    organization_type_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    organization_name?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    full_name?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    short_name?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    register_number?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    bic?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    phone?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    address?: string;

    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    ogrn?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    inn?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    kpp?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    okpo?: string;
}
