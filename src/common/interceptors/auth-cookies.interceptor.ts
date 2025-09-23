import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FastifyReply } from 'fastify';
import { CookiesService } from '../cookies/cookies.service';

@Injectable()
export class AuthCookiesInterceptor implements NestInterceptor {
  constructor(
    private readonly cookiesService: CookiesService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();
    return next.handle().pipe(
      tap((data) => {
        // Set cookies en login/refresh
        if (data?.data?.accessToken && data?.data?.refreshToken) {
          this.cookiesService.setRefreshToken(res, data.data.refreshToken);
          this.cookiesService.setUid(res, data.data.userId);
        }
        // Limpiar cookies en logout/logout-all
        if (context.getHandler().name === 'logout' || context.getHandler().name === 'logoutAll') {
          this.cookiesService.clearAll(res);
        }
      })
    );
  }
}
