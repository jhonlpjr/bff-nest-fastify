import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ENV } from 'src/common/constants/environments.constants';
import { HeaderKeys } from 'src/common/constants/headers.constants';

@Injectable()
export class AuthApiInterceptor implements NestInterceptor {
  constructor(private readonly config: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.getArgByIndex(0);
    if (httpContext && httpContext.headers) {
      httpContext.headers[HeaderKeys.X_CLIENT_KEY] = this.config.get(ENV.AUTH_SERVICE_CLIENT_KEY);
    }
    return next.handle();
  }
}
