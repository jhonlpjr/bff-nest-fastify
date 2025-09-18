import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { MoviesController } from './controllers/movies.controller';
import { SessionGuard } from './guards/session.guard';
import { CsrfGuard } from './guards/csrf.guard';
import { LoginUseCase } from '../application/use-cases/LoginUseCase';
import { LogoutUseCase } from '../application/use-cases/LogoutUseCase';
import { ProxyUseCase } from '../application/use-cases/ProxyUseCase';

@Module({
  controllers: [AuthController, MoviesController],
  providers: [
    // ...bindings de puertos a infraestructura...
    SessionGuard,
    CsrfGuard,
    { provide: 'LoginUseCase', useClass: LoginUseCase },
    { provide: 'LogoutUseCase', useClass: LogoutUseCase },
    { provide: 'ProxyUseCase', useClass: ProxyUseCase },
    // ...más bindings...
  ],
})
export class HttpModule {}
