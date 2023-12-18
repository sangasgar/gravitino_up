import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateFacilityDto {
    @IsInt()
    @ApiProperty({ default: 1 })
    checkpoint_id: number;

    @IsString()
    @ApiProperty()
    facility_name: string;

    @IsString()
    @ApiProperty()
    location: string;
}
