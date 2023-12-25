import { ApiProperty } from "@nestjs/swagger";

export class CreatePriorityDto {
    @ApiProperty()
    priority_name: string;
}

export class UpdatePriorityDto {
    @ApiProperty()
    priority_id: number;

    @ApiProperty()
    priority_name?: string;
}
