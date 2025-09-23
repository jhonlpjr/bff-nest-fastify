import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { STATUS_CODE_FOR_EXCEPTIONS } from '../constants/status-codes.constants';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../api/responses/error-response';
import { BadRequestError, ConflictError, DatabaseError, ForbiddenError, InternalServerError, TooManyRequestsError, UnauthorizedError } from '../exceptions';
import { NotFoundError } from 'rxjs';
import { ValidationError } from 'class-validator';


const exceptionMap = {
  BadRequestError,
  ConflictError,
  DatabaseError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
  ValidationError,
};

@Injectable()
@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    let status = 500;
    let errorResponse: ErrorResponse = new ErrorResponse('Internal server error');

    // Axios/HttpService error mapping
    if (exception.isAxiosError) {
      const axiosErr = exception as AxiosError;
      const statusFromDownstream = axiosErr.response?.status ?? 500;
      const data = axiosErr.response?.data;
      // Map to custom exception if possible
      let mapped = false;
      for (const key in exceptionMap) {
        if (
          (typeof data === 'object' && data !== null && (data as any).error === key) ||
          (typeof data === 'object' && data !== null && (data as any).name === key) ||
          (axiosErr.message && axiosErr.message.includes(key))
        ) {
          const ExceptionCtor = exceptionMap[key];
          const message = typeof data === 'object' && data !== null && (data as any).message
            ? (data as any).message
            : axiosErr.message;
          const details = typeof data === 'object' && data !== null && (data as any).details
            ? (data as any).details
            : data;
          const customEx = new ExceptionCtor(message, details);
          status = STATUS_CODE_FOR_EXCEPTIONS[key] || statusFromDownstream;
          errorResponse = new ErrorResponse(customEx.message, customEx.details);
          mapped = true;
          break;
        }
      }
      if (!mapped) {
        const messageKey = typeof data === 'object' && data !== null && 'message' in data ? (data as any).message : undefined;
        errorResponse = new ErrorResponse(messageKey || axiosErr.message, data?.['errors'] || data);
        status = statusFromDownstream;
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      errorResponse = new ErrorResponse(typeof res === 'string' ? res : (res as any).message, (res as any).details);
    } else {
      // Map to custom exception if possible
      for (const key in exceptionMap) {
        if (exception instanceof exceptionMap[key]) {
          status = STATUS_CODE_FOR_EXCEPTIONS[key] || HttpStatus.INTERNAL_SERVER_ERROR;
          errorResponse = new ErrorResponse(exception.message, exception.details);
          break;
        }
      }
    }
    response.status(status).send(errorResponse);
  }
}
