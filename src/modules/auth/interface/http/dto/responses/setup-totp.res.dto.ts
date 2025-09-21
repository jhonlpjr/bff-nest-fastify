import { ApiProperty } from '@nestjs/swagger';

export class SetupTotpResDto {
  @ApiProperty({ example: 'otpauth://totp/issuer:user?secret=ABC' })
  otpauthUrl: string;
}
