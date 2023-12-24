import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class FacilityResponse {
    @IsInt()
    @ApiProperty({ default: 1 })
    facility_id: number;

    @IsInt()
    @ApiProperty({ default: 1 })
    checkpoint_id: number;

    @IsString()
    @ApiProperty()
    facility_name: string;

    @IsString()
    @ApiProperty()
    location: string;

    @IsString()
    @ApiProperty()
    city: string;
}

export class StatusFacilityResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}