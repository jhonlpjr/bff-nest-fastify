import { Controller, Post, Req, Res, Body, HttpCode, Inject } from '@nestjs/common';
import type { LoginUseCase } from '../../application/use-cases/LoginUseCase';
import type { LogoutUseCase } from '../../application/use-cases/LogoutUseCase';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('LoginUseCase') private readonly loginUseCase: LoginUseCase,
    @Inject('LogoutUseCase') private readonly logoutUseCase: LogoutUseCase
  ) {}

  @Post('login')
  @HttpCode(204)
  async login(@Req() req, @Res() res, @Body() body: any) {
    const { username, password } = body;
    const result = await this.loginUseCase.execute(username, password);
    if (result.step === 'mfa') {
      res.code(200).send({ step: 'mfa' });
      return;
    }
    // Set-Cookie: __Host-session y XSRF-TOKEN
    // ...implementación...
    res.send();
  }

  @Post('logout')
  @HttpCode(204)
  async logout(@Req() req, @Res() res) {
    const sessionId = req.cookies?.['__Host-session'];
    await this.logoutUseCase.execute(sessionId);
    // Set-Cookie: Max-Age=0 para ambas cookies
    // ...implementación...
    res.send();
  }
}
