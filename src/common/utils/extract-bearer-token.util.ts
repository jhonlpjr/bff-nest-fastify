// utils/extract-bearer-token.util.ts
import type { FastifyRequest } from 'fastify';
import { extractHeaders } from './extract-headers.util';

export function extractBearerToken(req: FastifyRequest): string | undefined {
  const { authorization } = extractHeaders(req, ['authorization']);
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.slice(7);
  }
  return undefined;
}
