// decorador para extraer el usuario logueado desde la request (usando Fastify y JwtGuard)
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

export const UserLogged = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<FastifyRequest & { user?: any }>();
    return req.user;
  },
);
