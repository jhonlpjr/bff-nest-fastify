// Mapper para construir el DTO de logout a partir del request
import { LogoutRequestDto } from '../dtos/requests/logout-request.dto';

export class LogoutRequestMapper {
  static fromUser(user: any): LogoutRequestDto {
    return {
      userId: user?.sub,
      jti: user?.jti,
    } as LogoutRequestDto;
  }
}
