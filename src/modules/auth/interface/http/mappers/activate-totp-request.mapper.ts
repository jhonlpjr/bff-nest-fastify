import { TotpActivateDto } from '../dtos/requests/totp-activate-request.dto';

export class ActivateTotpRequestMapper {
  static fromRequest(accessToken: string, dto: TotpActivateDto) {
    return {
      accessToken,
      ...dto,
    };
  }
}
