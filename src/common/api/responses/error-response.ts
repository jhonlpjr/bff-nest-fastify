import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponse {
    @ApiProperty({ example: false })
    success: boolean = false;
    @ApiProperty({ example: 'Error occurred' })
    message: string;
    @ApiProperty({ example: 'Error details', required: false })
    errors?: any;
    constructor(message: string, errors?: any) {
        this.message = message;
        this.errors = errors;
    }
}