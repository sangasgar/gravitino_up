import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsInt, IsString } from "class-validator";
import { Category } from "../entities/category.entity";

export class CategoryResponse {
    @IsInt()
    @ApiProperty()
    category_id: number;

    @IsString()
    @ApiProperty()
    category_name: string;
}

export class StatusCategoryResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}