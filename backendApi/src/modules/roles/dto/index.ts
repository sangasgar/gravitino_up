import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty()
    role_name: string;
}

export class UpdateRoleDto {
    @ApiProperty()
    role_id?: number;

    @ApiProperty()
    role_name?: string;
}
