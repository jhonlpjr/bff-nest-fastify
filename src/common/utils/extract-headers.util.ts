// utils/extract-headers.util.ts
import type { FastifyRequest } from 'fastify';

export function extractHeaders(req: FastifyRequest, headerNames: string[] | Record<string, string>): Record<string, string | undefined> {
  const result: Record<string, string | undefined> = {};
  if (Array.isArray(headerNames)) {
    for (const name of headerNames) {
      result[name] = req.headers[name.toLowerCase()] as string | undefined;
    }
  } else {
    for (const key in headerNames) {
      const header = headerNames[key];
      result[key] = req.headers[header.toLowerCase()] as string | undefined;
    }
  }
  return result;
}
