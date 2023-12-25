import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsInt } from "class-validator";

export class OrderStatusResponse {
    @IsInt()
    @ApiProperty()
    status_id: number;

    @IsString()
    @ApiProperty()
    status_name: string;
}

export class StatusOrderStatusResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}