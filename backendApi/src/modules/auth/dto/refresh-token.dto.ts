import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshTokenDto {
    @IsString()
    @ApiProperty()
    refresh_token: string;
}
