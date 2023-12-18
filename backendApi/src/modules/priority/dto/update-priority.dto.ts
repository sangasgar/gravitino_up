import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePriorityDto } from './create-priority.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePriorityDto extends PartialType(CreatePriorityDto) {
    @IsOptional()
    @IsString()
    @ApiProperty()
    priority_name?: string;
}
