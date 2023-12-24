import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class CheckpointResponse {
    @IsInt()
    @ApiProperty({ default: 1 })
    checkpoint_id: number;

    @IsInt()
    @ApiProperty({ default: 1 })
    organization_id: number;

    @IsString()
    @ApiProperty()
    checkpoint_name: string;

    @IsString()
    @ApiProperty()
    location: string;

    @IsString()
    @ApiProperty()
    city: string;
}

export class StatusCheckpointResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}