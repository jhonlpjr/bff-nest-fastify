
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MfaVerifyDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiPropertyOptional({ example: 'tx_abc123' })
  @IsString()
  @IsOptional()
  login_tx?: string;
}
