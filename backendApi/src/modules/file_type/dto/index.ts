import { ApiProperty } from "@nestjs/swagger";

export class CreateFileTypeDto {
    @ApiProperty()
    type_name: string;

    @ApiProperty()
    file_extension: string;
}

export class UpdateFileTypeDto {
    @ApiProperty()
    file_type_id?: number;

    @ApiProperty()
    type_name?: string;

    @ApiProperty()
    file_extension?: string;
}
