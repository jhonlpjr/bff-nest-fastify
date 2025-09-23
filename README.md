
# BFF NestJS + Fastify (Clean Architecture)

Robust Backend For Frontend (BFF) for authentication and secure proxy, using NestJS + Fastify, Clean Architecture, Docker, and automated tests.

## Main Features
- Strict Clean Architecture: domain, application, infrastructure, interface/http
- Auth Endpoints: login, refresh, logout, logout-all (with JWT, signed cookies, optional MFA)
- Secure proxy to external microservices (e.g., Movies API)
- Security: HttpOnly/SameSite cookies, CORS, rate-limit, secure headers
- Docker-ready, validated environment variables
- Unit and e2e tests with automatic mocking of external services

## Folder Structure

```text
└── 📁src
  └── 📁common
    └── 📁api
      └── 📁responses
        ├── create-response.ts
        ├── error-response.ts
        ├── ok-response.ts
    └── 📁config
      ├── app.config.ts
      ├── env.config.ts
    └── 📁constants
      ├── environments.constants.ts
      ├── headers.constants.ts
      ├── keys.constants.ts
      ├── status-codes.constants.ts
    └── 📁cookies
      ├── cookies.service.ts
    └── 📁decorators
      ├── bearer-token.decorator.ts
      ├── custom-headers.decorator.ts
      ├── user-logged.decorator.ts
    └── 📁dtos
    └── 📁enums
      ├── environments.enum.ts
    └── 📁errors
      ├── error.mapper.ts
      ├── global-http-exception.filter.ts
      ├── http-exception.filter.ts
    └── 📁exceptions
      ├── bad-request-error.ts
      ├── conflict-error.ts
      ├── database-error.ts
      ├── forbidden-error.ts
      ├── index.ts
      ├── internal-server-error.ts
      ├── not-found-error.ts
      ├── too-many-requests-error.ts
      ├── unauthorized-error.ts
      ├── validation-error.ts
    └── 📁guards
      ├── jwt.guard.ts
      ├── mfa.guard.ts
    └── 📁interceptors
      ├── auth-cookies.interceptor.ts
      ├── index.ts
      ├── logging.interceptor.ts
      ├── response-mapping.interceptor.ts
      ├── timeout.interceptor.ts
    └── 📁mappers
      ├── response.mapper.ts
    └── 📁pipes
      ├── validation.pipe.ts
    └── 📁providers
      ├── common.providers.ts
    └── 📁rate-limit
      ├── throttler.config.ts
    └── 📁services
      ├── jwks.service.ts
      ├── secret-manager.service.ts
      ├── secrets-bootstrap.service.ts
    └── 📁utils
      ├── extract-bearer-token.util.ts
      ├── extract-headers.util.ts
  └── 📁modules
    └── 📁auth
      └── 📁application
        └── 📁dtos
          └── 📁params
            ├── login.params.ts
            ├── logout.params.ts
            ├── mfa-verify.params.ts
            ├── refresh.params.ts
            ├── setup-totp.params.ts
            ├── totp-activate.params.ts
          └── 📁results
            ├── activate-totpt.result.ts
            ├── login.result.ts
            ├── mfa-login.result.ts
            ├── revoke.result.ts
            ├── setup-totp.result.ts
        └── 📁functions
          ├── login.functions.ts
        └── 📁mappers
          ├── activate-totp.mapper.ts
          ├── login.mapper.ts
          ├── verify-mfa.mapper.ts
        └── 📁ports
          └── 📁requests
            ├── activate-totp-port.request.ts
            ├── login-port.request.ts
            ├── refresh-token-port.request.ts
            ├── revoke-port.request.ts
            ├── setup-totp-port.request.ts
            ├── verify-mfa-port.request.ts
          └── 📁responses
            ├── activate-totp-port.res.ts
            ├── auth-service-port.res.ts
            ├── login-port.res.ts
            ├── mfa-login-port.res.ts
            ├── revoke-port.res.ts
            ├── setup-totp-port.res.ts
          ├── auth-api.port.ts
        └── 📁use-cases
          ├── activate-totp.use-case.ts
          ├── login.use-case.ts
          ├── logout-all.use-case.ts
          ├── logout.use-case.ts
          ├── refresh.use-case.ts
          ├── setup-totp.use-case.ts
          ├── verify-mfa.use-case.ts
      └── 📁domain
        └── 📁entities
          ├── login-tx.vo.ts
      └── 📁infrastructure
        └── 📁adapters
          └── 📁http
            ├── auth-api.http.adapter.mock.ts
            ├── auth-api.http.adapter.ts
            ├── auth-api.interceptor.ts
        └── 📁mappers
        └── 📁providers
          ├── auth.providers.ts
          ├── types.ts
      └── 📁interface
        └── 📁http
          └── 📁dtos
            └── 📁requests
              ├── login-request.dto.ts
              ├── logout-all-request.dto.ts
              ├── logout-request.dto.ts
              ├── mfa-verify-request.dto.ts
              ├── refresh-request.dto.ts
              ├── setup-totp-request.dto.ts
              ├── totp-activate-request.dto.ts
            └── 📁responses
              ├── activate-totp.res.dto.ts
              ├── login.res.dto.ts
              ├── mfa-login.res.dto.ts
              ├── setup-totp.res.dto.ts
              ├── success.res.dto.ts
              ├── verify-mfa.res.dto.ts
          └── 📁mappers
            ├── activate-totp-request.mapper.ts
            ├── api-login.mapper.ts
            ├── api-logout.mapper.ts
            ├── api-refresh.mapper.ts
            ├── logout-all-request.mapper.ts
            ├── logout-request.mapper.ts
            ├── setup-totp-request.mapper.ts
          ├── auth.controller.ts
      ├── auth.module.ts
    └── 📁health
      ├── health.controller.ts
      ├── health.module.ts
  ├── app.module.ts
  ├── main.ts
  └── pre-bootstrap.ts
```

## Installation & Environment

1. Copy `.env.example` to `.env` and set your endpoints and secrets:
   - AUTH_BASE_URL=http://localhost:6010/api/v1
   - COOKIE_SECRET=your-secret
   - COOKIE_DOMAIN=localhost
   - CORS_ORIGINS=http://localhost:3000
   - AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY (if using AWS)
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Start Redis/localstack if you use sessions/AWS:
   ```bash
   docker compose up -d redis
   ```

## Running

```bash
# development
npm run start:dev
# production
npm run start:prod
# debug
npm run start:debug
```

## Main Endpoints

| Path                | Method | Description                  | Auth |
|---------------------|--------|------------------------------|------|
| /auth/login         | POST   | User login/MFA               | No   |
| /auth/refresh       | POST   | Refresh token                | No   |
| /auth/logout        | POST   | User logout                  | Yes  |
| /auth/logout-all    | POST   | Logout all sessions          | Yes  |

## Security
- Signed cookies (uid, refreshToken) with HttpOnly, Secure, SameSite
- JWT ES256, validation with JWKS
- Global and per-endpoint rate-limit
- CORS configurable by environment
- Secure headers (HSTS, X-Content-Type-Options, etc)

## Environment Variables
Example `.env`:
```env
PORT=6020
AUTH_BASE_URL=http://localhost:6010/api/v1
COOKIE_SECRET=kmfps124ak1mfps124a
COOKIE_DOMAIN=localhost
COOKIE_SAMESITE=lax
CORS_ORIGINS=http://localhost:3000
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=xxxx
AWS_SECRET_ACCESS_KEY=xxxx
HTTP_REQUEST_TIMEOUT=5000
```

## Docker

```bash
docker compose up --build
```
Example `docker-compose.yml`:
```yaml
services:
  bff:
    image: node:24-alpine
    container_name: bff
    working_dir: /app
    volumes:
      - ./:/app
    command: sh -c "rm -rf node_modules package-lock.json && npm install && npm run build && npm run start"
    ports:
      - "6020:6050"
    env_file:
      - .env
    extra_hosts:
      - "host.docker.internal:host-gateway"
```

## Tests

- Unit: `npm run test:unit` (use-cases, mappers, guards)
- E2E: `npm run test:e2e` (login, refresh, logout, MFA, TOTP, guards)
  - E2E tests use an automatic mock of the external adapter if `NODE_ENV=test` (no real backend required)
  - **Recommended:** use the `.env.test` file already included in the project for e2e, with dummy and safe values. If you prefer, you can create your own `.env.test` with any values you want.

## Automatic Mock in E2E
When you run `npm run test:e2e`, the Auth adapter is replaced by a mock that returns valid data for login, refresh, MFA, TOTP, etc. This allows e2e tests to pass without relying on external services or real credentials. You only need to have `.env.test` configured (already included in the repo).

## Main Endpoints

| Path                        | Method | Description                        | Auth |
|-----------------------------|--------|------------------------------------|------|
| /auth/login                 | POST   | User login/MFA                     | No   |
| /auth/refresh               | POST   | Refresh token                      | No   |
| /auth/mfa/verify            | POST   | Verify MFA                         | No   |
| /auth/mfa/totp/setup        | POST   | Setup TOTP (QR/secret)             | Yes  |
| /auth/mfa/totp/activate     | POST   | Activate TOTP                      | Yes  |
| /auth/logout                | POST   | User logout                        | Yes  |
| /auth/logout-all            | POST   | Logout all sessions                | Yes  |
| /health                     | GET    | Healthcheck                        | No   |

### Quick Endpoint Descriptions
- **/auth/login**: Login, may require MFA.
- **/auth/refresh**: Refreshes the access token using cookies.
- **/auth/mfa/verify**: Verifies MFA code (TOTP/SMS).
- **/auth/mfa/totp/setup**: Generates QR/secret for TOTP.
- **/auth/mfa/totp/activate**: Activates TOTP for the user.
- **/auth/logout**: Ends current session.
- **/auth/logout-all**: Ends all user sessions.
- **/health**: Endpoint for monitoring/infrastructure.

## Swagger Documentation

- The API exposes interactive Swagger documentation at:
  - **http://localhost:6020/api/docs**
- You can test all endpoints, view request/response models, and copy examples directly from the Swagger UI.
- Swagger is automatically updated with DTOs and contracts defined in the code.

---

## Resources
- [NestJS Docs](https://docs.nestjs.com)
- [Fastify Docs](https://www.fastify.io/docs/latest/)
- [Clean Architecture](https://github.com/ardalis/CleanArchitecture)
- [Docker Compose](https://docs.docker.com/compose/)

## Author & Contact
- Author: Jhon L. P. Jr.
- Email: jhonlpjr@gmail.com
- LinkedIn: [linkedin.com/in/jhonlpjr](https://linkedin.com/in/jhonlpjr)
- GitHub: [github.com/jhonlpjr](https://github.com/jhonlpjr)

## License
MIT
