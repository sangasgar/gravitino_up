import { ApiProperty } from "@nestjs/swagger";

export class CreateFacilityDto {
    @ApiProperty({ default: 1 })
    checkpoint_id: number;

    @ApiProperty()
    facility_name: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
    city: string;
}

export class UpdateFacilityDto {
    @ApiProperty({ default: 1 })
    facility_id?: number;

    @ApiProperty({ default: 1 })
    checkpoint_id?: number;

    @ApiProperty()
    facility_name?: string;

    @ApiProperty()
    location?: string;

    @ApiProperty()
    city?: string;
}