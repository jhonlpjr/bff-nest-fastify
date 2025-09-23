import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './interface/http/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RefreshUseCase } from './application/use-cases/refresh.use-case';
import { VerifyMfaUseCase } from './application/use-cases/verify-mfa.use-case';
import { SetupTotpUseCase } from './application/use-cases/setup-totp.use-case';
import { ActivateTotpUseCase } from './application/use-cases/activate-totp.use-case';
import { LogoutUseCase } from './application/use-cases/logout.use-case';
import { LogoutAllUseCase } from './application/use-cases/logout-all.use-case';
import { AuthProviders } from './infrastructure/providers/auth.providers';
import { CookiesService } from '../../common/cookies/cookies.service';
import { CommonProviders } from '../../common/providers/common.providers';
import { ENV } from '../../common/constants/environments.constants';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get<string>(ENV.AUTH_BASE_URL),
        timeout: config.get<number>(ENV.HTTP_REQUEST_TIMEOUT),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...AuthProviders,
    ...CommonProviders,
    // Use-cases
    LoginUseCase,
    RefreshUseCase,
    VerifyMfaUseCase,
    SetupTotpUseCase,
    ActivateTotpUseCase,
    LogoutUseCase,
    LogoutAllUseCase,
    CookiesService,
  ],
  exports: [],
})
export class AuthModule {}
