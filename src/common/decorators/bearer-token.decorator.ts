// decoradores/bearer-token.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { extractBearerToken } from '../utils/extract-bearer-token.util';
import type { FastifyRequest } from 'fastify';

export const BearerToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<FastifyRequest>();
    const token = extractBearerToken(req);
    if (!token) {
      throw new Error('Missing Bearer Token');
    }
    return token;
  },
);
