import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
    @IsInt()
    @IsOptional()
    @ApiProperty()
    role_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    role_name?: string;
}
