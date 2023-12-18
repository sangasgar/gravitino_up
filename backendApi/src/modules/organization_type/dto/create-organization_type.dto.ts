import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateOrganizationTypeDto {
    @IsString()
    @ApiProperty()
    type_name: string;
}
