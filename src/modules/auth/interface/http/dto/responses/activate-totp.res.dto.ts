import { ApiProperty } from '@nestjs/swagger';

export class ActivateTotpResDto {
  @ApiProperty({ example: true })
  activated: boolean;
}
