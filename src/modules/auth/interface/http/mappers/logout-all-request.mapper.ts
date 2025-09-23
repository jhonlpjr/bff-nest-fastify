import { LogoutRequestDto } from '../dtos/requests/logout-request.dto';

export class LogoutAllRequestMapper {
  static fromUser(user: any): LogoutRequestDto {
    return {
      userId: user?.sub,
      jti: user?.jti,
    };
  }
}
