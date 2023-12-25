import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty()
    work_type: string;

    @ApiProperty({ default: 1 })
    category_id: number;

    @ApiProperty()
    work_type_description: string;

    @ApiProperty()
    task_description: string;

    @ApiProperty()
    area: string;
}

export class UpdateTaskDto {
    @ApiProperty()
    task_id?: number;

    @ApiProperty({ default: 1 })
    category_id?: number;

    @ApiProperty()
    work_type?: string;

    @ApiProperty()
    work_type_description?: string;

    @ApiProperty()
    task_description?: string;

    @ApiProperty()
    area?: string;
}