import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class FileTypeResponse {
    @IsInt()
    @ApiProperty()
    file_type_id?: number;

    @IsString()
    @ApiProperty()
    type_name: string;

    @IsString()
    @ApiProperty()
    file_extension: string;
}

export class StatusFileTypeResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}