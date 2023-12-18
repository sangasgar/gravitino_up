import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateCheckpointDto {
    @IsInt()
    @ApiProperty({ default: 1 })
    checkpoint_id?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({ default: 1 })
    organization_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    checkpoint_name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    location?: string;
}
