import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderStatusDto {
    @ApiProperty()
    status_name: string;
}

export class UpdateOrderStatusDto {
    @ApiProperty()
    status_id?: number;

    @ApiProperty()
    status_name?: string;
}
