import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePriorityDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    priority_name: string;
}
