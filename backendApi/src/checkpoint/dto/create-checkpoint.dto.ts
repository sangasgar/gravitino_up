import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateCheckpointDto {
    @IsInt()
    @ApiProperty({ default: 1 })
    organization_id: number;

    @IsString()
    @ApiProperty()
    checkpoint_name: string;

    @IsString()
    @ApiProperty()
    location: string;
}
