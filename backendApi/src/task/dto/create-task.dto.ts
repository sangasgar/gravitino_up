import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @ApiProperty()
    work_type: string;

    @IsString()
    @ApiProperty({ default: 1 })
    category_id: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    work_type_description: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    task_description: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    area: string;
}
