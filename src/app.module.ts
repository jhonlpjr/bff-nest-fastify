

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { appValidationSchema } from './common/config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: appValidationSchema,
    }),
  AuthModule,
  HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
