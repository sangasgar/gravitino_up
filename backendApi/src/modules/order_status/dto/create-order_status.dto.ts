import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateOrderStatusDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    status_name: string;
}
