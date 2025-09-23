import { RefreshParams } from 'src/modules/auth/application/dtos/params/refresh.params';
import { FastifyRequest } from 'fastify/types/request';
import { UnauthorizedException } from '@nestjs/common';

export class RefreshRequestMapper {
  static fromRequest(req: FastifyRequest): RefreshParams {
    // Extrae refreshToken y userId de cookies o del request
    const signedRaw = req.cookies?.uid;
    if (!signedRaw || typeof req.unsignCookie !== 'function') {
      throw new UnauthorizedException('Cookie inválida (no firmada o método no disponible)');
    }
    const { valid, value } = req.unsignCookie(signedRaw);
    if (!valid) throw new UnauthorizedException('Cookie inválida');
    return {
      refreshToken: req.cookies?.refreshToken,
      userId: value,
    };
  }
}
