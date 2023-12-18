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
