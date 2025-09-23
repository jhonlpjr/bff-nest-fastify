import { ActivateTotpResult } from "../dtos/results/activate-totpt.result";
import { ActivateTotpPortResponse } from "../ports/responses/activate-totp-port.res";

export namespace ActivateTotpMapper {
  export function toResult(data: ActivateTotpPortResponse): ActivateTotpResult {
    return {
      activated: data.activated,
    };
  }

}