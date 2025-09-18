<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


# BFF NestJS + Fastify (Clean Architecture)

## Features
- BFF (Backend For Frontend) para microservicios Auth (Koa) y Movies (.NET)
- Clean Architecture estricta (domain, application, infrastructure, api)
- Sesión opaca en Redis (__Host-session)
- CSRF protection (double-submit + Origin/Referer)
- Proxy seguro a API Movies
- Seguridad: cookies HttpOnly/SameSite, headers, rate-limit

## Folder Structure

```
domain/
  entities/Session.ts
application/
  ports/         # interfaces (SessionRepository, AuthProvider, ApiGateway, ...)
  use-cases/     # LoginUseCase, RefreshUseCase, ...
infrastructure/
  repositories/  # RedisSessionRepository
  providers/     # HttpAuthProvider, HttpApiGateway, CsrfServiceImpl
  config/env.ts  # env loader
api/
  controllers/   # AuthController, MoviesController
  guards/        # SessionGuard, CsrfGuard
  dtos/          # LoginDto, ...
  http.module.ts # bindings
docker-compose.yml
```

## Setup

1. Copia `.env.example` a `.env` y configura:
   - AUTH_BASE_URL=https://auth.midominio.com
   - API_BASE_URL=https://api.midominio.com
   - REDIS_URL=redis://localhost:6379
   - SESSION_TTL_MIN=60
   - ALLOWED_ORIGINS=https://app.midominio.com
   - NODE_ENV=development
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Levanta Redis:
   ```bash
   docker compose up -d redis
   ```

## Run

```bash
# development
npm run start:dev
# production
npm run start:prod
```

## API Routes

| Route                        | Method | CSRF | Description                       |
|------------------------------|--------|------|-----------------------------------|
| /auth/login                  | POST   | No   | Login (step: mfa o done)          |
| /auth/logout                 | POST   | No   | Logout                            |
| /api/movies                  | GET    | No   | List movies                       |
| /api/movies                  | POST   | Yes  | Create movie                      |
| /api/movies/:id              | GET    | No   | Get movie by id                   |
| /api/movies/:id              | PATCH  | Yes  | Update movie                      |
| /api/movies/:id              | DELETE | Yes  | Delete movie                      |
| /api/movies/search           | GET    | No   | Search movies (query passthrough) |
| /api/movies/popular          | GET    | No   | Popular movies                    |
| /api/movies/recommendations  | GET    | No   | Recommendations                   |

## Security Notes
- Cookies: __Host-session (HttpOnly, Secure, SameSite=Strict), XSRF-TOKEN (no HttpOnly, SameSite=Lax)
- CSRF: double-submit + Origin/Referer, solo en mutaciones
- CORS: solo si frontend y BFF son orígenes distintos (ALLOWED_ORIGINS)
- Headers: HSTS, X-Content-Type-Options, Referrer-Policy, frame-ancestors, CSP (si HTML)

## Roadmap
- [x] Clean Architecture base
- [x] Redis session opaca
- [x] CSRF protection
- [x] Proxy seguro a API Movies
- [ ] MFA/WebAuthn (TODO)

## curl Examples

### Login (recibir cookies)
```bash
curl -i -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"pass"}'
# Si requiere MFA: { step: "mfa" }
# Si OK: 204 + Set-Cookie: __Host-session, XSRF-TOKEN
```

### GET /api/movies (requiere sesión)
```bash
curl -i http://localhost:3000/api/movies \
  --cookie "__Host-session=..."
# 200 OK, proxy a API
```

### POST /api/movies sin X-XSRF-TOKEN (debe fallar)
```bash
curl -i -X POST http://localhost:3000/api/movies \
  --cookie "__Host-session=..." \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Movie"}'
# 403 Forbidden
```

### POST /api/movies con X-XSRF-TOKEN (mock 201)
```bash
curl -i -X POST http://localhost:3000/api/movies \
  --cookie "__Host-session=...; XSRF-TOKEN=..." \
  -H "Content-Type: application/json" \
  -H "X-XSRF-TOKEN: ..." \
  -d '{"title":"Test Movie"}'
# 201 Created (mock)
```

---

## Tests

- Unit: LoginUseCase y ProxyUseCase con mocks de puertos
- E2E: login espera cookies, POST /api/movies sin X-XSRF-TOKEN → 403, con X-XSRF-TOKEN → 201, GET /api/movies → 200

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
