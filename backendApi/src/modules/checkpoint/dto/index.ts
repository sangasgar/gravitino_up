import { ApiProperty } from "@nestjs/swagger";

export class CreateCheckpointDto {
    @ApiProperty({ default: 1 })
    organization_id: number;

    @ApiProperty()
    checkpoint_name: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
    city: string;
}

export class UpdateCheckpointDto {
    @ApiProperty({ default: 1 })
    checkpoint_id?: number;

    @ApiProperty({ default: 1 })
    organization_id?: number;

    @ApiProperty()
    checkpoint_name?: string;

    @ApiProperty()
    location?: string;

    @ApiProperty()
    city?: string;
}
