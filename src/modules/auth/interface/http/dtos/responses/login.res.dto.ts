import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {
  @ApiProperty({ example: 'user-uuid-123' })
  userId: string;

  @ApiProperty({ example: 'jwt-access-token' })
  accessToken: string;

  @ApiProperty({ example: 'jwt-refresh-token' })
  refreshToken: string;

  @ApiProperty({ example: 3600 })
  expiresIn: number;

  @ApiProperty({ example: 'openid' })
  scope?: string;

  @ApiProperty({ example: 'aud' })
  aud?: string;

  @ApiProperty({ example: 'Bearer' })
  tokenType: string;

  @ApiProperty({ example: true })
  atSet: boolean;

  @ApiProperty({ example: true })
  rtSet: boolean;
}
