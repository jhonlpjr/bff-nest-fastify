
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TotpActivateDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  token: string;
}
