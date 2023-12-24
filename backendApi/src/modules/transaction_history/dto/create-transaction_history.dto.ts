import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateTransactionHistoryDto {
    @IsInt()
    @ApiProperty()
    user_id: number;

    @IsString()
    @ApiProperty()
    comment: string;
}
