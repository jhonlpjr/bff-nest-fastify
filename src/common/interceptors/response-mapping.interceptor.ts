import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FastifyReply } from 'fastify';

@Injectable()
export class ResponseMappingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();
    return next.handle().pipe(
      map((data) => {
        // Si el handler ya devolvió una respuesta Fastify, no hacer nada
        if (res.sent) return;
        // Si el handler retorna un objeto con statusCode, úsalo
        if (data && typeof data === 'object' && data.statusCode) {
          res.status(data.statusCode);
        }
        // Retornar el objeto tal cual (para que Fastify lo serialice)
        return data;
      })
    );
  }
}
