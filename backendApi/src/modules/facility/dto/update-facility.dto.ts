import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateFacilityDto {
    @IsInt()
    @ApiProperty({ default: 1 })
    facility_id?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({ default: 1 })
    checkpoint_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    facility_name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    location?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    city?: string;
}
