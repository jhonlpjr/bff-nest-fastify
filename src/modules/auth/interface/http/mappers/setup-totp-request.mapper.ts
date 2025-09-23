// Mapper para construir el DTO de setupTotp a partir del token y el body
import { SetupTotpRequestDto } from '../dtos/requests/setup-totp-request.dto';

export class SetupTotpRequestMapper {
  static fromRequest(accessToken: string, dto: SetupTotpRequestDto) {
    return {
      ...dto,
      accessToken,
    };
  }
}
