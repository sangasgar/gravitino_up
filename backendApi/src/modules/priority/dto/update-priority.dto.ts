import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePriorityDto } from './create-priority.dto';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePriorityDto extends PartialType(CreatePriorityDto) {
    @IsInt()
    @ApiProperty()
    priority_id: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    priority_name?: string;
}
