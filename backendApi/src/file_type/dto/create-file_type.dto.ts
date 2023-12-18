import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateFileTypeDto {
    @IsString()
    @ApiProperty()
    type_name: string;
}
