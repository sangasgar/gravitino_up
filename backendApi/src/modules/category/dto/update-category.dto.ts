import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
    @IsInt()
    @ApiProperty()
    category_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    category_name?: string;
}
