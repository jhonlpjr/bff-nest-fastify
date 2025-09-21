import { ApiProperty } from '@nestjs/swagger';

export class SuccessResDto {
  @ApiProperty({ example: true })
  success: boolean;
}
