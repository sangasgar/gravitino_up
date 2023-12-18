import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateReportDto {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty({ default: 1 })
    report_user_id: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    file_sku: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    file_alt: string;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({ default: 1 })
    file_type_id: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    report_json: string;
}
