import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class RefreshRequestDto {
  @ApiProperty({ description: 'Refresh token', required: false })
  @IsString()
  @IsOptional()
  refreshToken?: string;

  @ApiProperty({ description: 'User ID', required: false })
  @IsString()
  @IsOptional()
  userId?: string;
}
