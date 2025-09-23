import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import cookie from '@fastify/cookie';
import { AppValidationPipe } from './common/pipes/validation.pipe';
import { GlobalHttpExceptionFilter } from './common/errors/global-http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseMappingInterceptor } from './common/interceptors/response-mapping.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  // Inyectar secretos configurados antes de iniciar la app
    // Secrets are assumed to be injected via process.env, so this line is removed.

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  await app.register(cookie, { secret: process.env.COOKIE_SECRET || 'default_secret' });
  app.useGlobalPipes(AppValidationPipe);
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseMappingInterceptor(), new LoggingInterceptor());
  app.enableCors({
    origin: (process.env.CORS_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean),
    credentials: true,
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('BFF API')
    .setDescription('API documentation for the BFF')
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth('refreshToken', { type: 'apiKey', in: 'cookie' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
  const HOST = process.env.HOST || '0.0.0.0';
  await app.listen(PORT, HOST);
  console.log(`Server is running on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
}
bootstrap();
