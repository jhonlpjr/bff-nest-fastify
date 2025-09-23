import { ApiProperty } from "@nestjs/swagger";

export class OkResponse<T> {
    @ApiProperty({ example: true })
    success: boolean = true;
    @ApiProperty()
    data: T;
    constructor(data: T) {
        this.data = data;
    }
}