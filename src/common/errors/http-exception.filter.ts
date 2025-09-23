import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import type { FastifyReply } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
  const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message;
    response.status(status).send({
      error: {
        code: status,
        message,
      },
    });
  }
}
