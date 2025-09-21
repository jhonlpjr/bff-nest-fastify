import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class AuthApiInterceptor implements NestInterceptor {
  constructor(private readonly config: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.getArgByIndex(0);
    if (httpContext && httpContext.headers) {
      httpContext.headers['X-Client-Key'] = this.config.get('BFF_CLIENT_KEY');
    }
    return next.handle();
  }
}
