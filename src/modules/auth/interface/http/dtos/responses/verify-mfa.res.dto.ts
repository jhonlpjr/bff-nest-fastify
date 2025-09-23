import { ApiProperty } from '@nestjs/swagger';

export class VerifyMfaResDto {
  @ApiProperty({ example: true })
  verified: boolean;
}
