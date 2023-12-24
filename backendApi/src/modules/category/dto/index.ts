import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty()
    category_name: string;
}

export class UpdateCategoryDto {
    @ApiProperty()
    category_id?: number;

    @ApiProperty()
    category_name?: string;
}
