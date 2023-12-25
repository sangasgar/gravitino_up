import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class TaskResponse {
    @IsString()
    @ApiProperty()
    task_id: number;

    @IsString()
    @ApiProperty()
    work_type: string;

    @IsString()
    @ApiProperty({ default: 1 })
    category_id: number;

    @IsString()
    @ApiProperty()
    work_type_description: string;

    @IsString()
    @ApiProperty()
    task_description: string;

    @IsString()
    @ApiProperty()
    area: string;
}

export class StatusTaskResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}