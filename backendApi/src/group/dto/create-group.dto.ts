import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGroupDto {
    @IsString()
    @ApiProperty()
    group_name: string;
}
