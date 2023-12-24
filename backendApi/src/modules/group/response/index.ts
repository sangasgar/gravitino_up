import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsInt } from "class-validator";

export class GroupResponse {
    @IsInt()
    @ApiProperty()
    group_id: number;

    @IsString()
    @ApiProperty()
    group_name: string;
}

export class StatusGroupResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}