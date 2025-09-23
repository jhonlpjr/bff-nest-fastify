// decoradores/custom-headers.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { extractHeaders } from '../utils/extract-headers.util';
import type { FastifyRequest } from 'fastify';

export const CustomHeaders = (headerNames: string[] | Record<string, string>) =>
  createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<FastifyRequest>();
    return extractHeaders(req, headerNames);
  })();
