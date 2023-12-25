import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsInt, IsString } from "class-validator";

export class TransactionHistoryResponse {
    @IsInt()
    @ApiProperty()
    history_id: number;

    @IsInt()
    @ApiProperty()
    user_id: number;

    @IsString()
    @ApiProperty()
    comment: string;
}

export class StatusTransactionHistoryResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}