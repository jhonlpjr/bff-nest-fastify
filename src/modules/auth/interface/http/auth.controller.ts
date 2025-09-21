
import { Controller, Post, Body, Req, Res, UseFilters, UseGuards, HttpCode } from '@nestjs/common';
import type { Request, Response } from 'express';
import { LoginDto } from './dto/requests/login.dto';
import { MfaVerifyDto } from './dto/requests/mfa-verify.dto';
import { TotpActivateDto } from './dto/requests/totp-activate.dto';
import { LoginResDto } from './dto/responses/login.res.dto';
import { MfaLoginResDTO } from './dto/responses/mfa-login.res.dto';
import { VerifyMfaResDto } from './dto/responses/verify-mfa.res.dto';
import { SetupTotpResDto } from './dto/responses/setup-totp.res.dto';
import { ActivateTotpResDto } from './dto/responses/activate-totp.res.dto';
import { SuccessResDto } from './dto/responses/success.res.dto';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { mapLoginResponse } from '../../infrastructure/mappers/auth.mapper';
import { RefreshUseCase } from '../../application/use-cases/refresh.use-case';
import { VerifyMfaUseCase } from '../../application/use-cases/verify-mfa.use-case';
import { SetupTotpUseCase } from '../../application/use-cases/setup-totp.use-case';
import { ActivateTotpUseCase } from '../../application/use-cases/activate-totp.use-case';
import { LogoutUseCase } from '../../application/use-cases/logout.use-case';
import { LogoutAllUseCase } from '../../application/use-cases/logout-all.use-case';
import { HttpExceptionFilter } from '../../../../common/errors/http-exception.filter';
import { ApiTags, ApiBody, ApiResponse, ApiOkResponse, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshUseCase: RefreshUseCase,
    private readonly verifyMfaUseCase: VerifyMfaUseCase,
    private readonly setupTotpUseCase: SetupTotpUseCase,
    private readonly activateTotpUseCase: ActivateTotpUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly logoutAllUseCase: LogoutAllUseCase
  ) { }

  @Post('login')
  @HttpCode(200)
  @ApiExtraModels(LoginResDto, MfaLoginResDTO)
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Successful login or MFA required',
    content: {
      'application/json': {
        schema: {
          oneOf: [
            { $ref: getSchemaPath(LoginResDto) },
            { $ref: getSchemaPath(MfaLoginResDTO) },
          ],
        },
        examples: {
          login: {
            summary: 'Successful login',
            value: {
              userId: 'user-uuid-123',
              accessToken: 'jwt-access-token',
              expiresIn: 3600,
              scope: 'openid',
              aud: 'aud',
              tokenType: 'Bearer',
              atSet: true,
              rtSet: true,
            },
          },
          mfa: {
            summary: 'MFA required',
            value: {
              step: 'mfa',
              login_tx: 'login-transaction-id',
              mfa: { types: ['totp', 'sms'] },
            },
          },
        },
      }
    },
  })
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const result = await this.loginUseCase.execute(dto, res);
    res.json(mapLoginResponse(result));
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: LoginResDto })
  async refresh(@Req() req: Request, @Res() res: Response) {
    const result = await this.refreshUseCase.execute(req, res);
    // Map to LoginResDto usando mapper
    res.json(mapLoginResponse(result));
  }

  @Post('mfa/verify')
  @HttpCode(200)
  @ApiBody({ type: MfaVerifyDto })
  @ApiResponse({ status: 200, type: VerifyMfaResDto })
  async verifyMfa(@Body() dto: MfaVerifyDto, @Res() res: Response) {
    const result = await this.verifyMfaUseCase.execute(dto);
    const response: VerifyMfaResDto = { verified: result.verified };
    res.json(response);
  }

  @Post('mfa/totp/setup')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: SetupTotpResDto })
  async setupTotp(@Req() req: Request, @Res() res: Response) {
    const accessToken = req.headers['authorization']?.replace('Bearer ', '');
    if (!accessToken) throw new Error('Missing access token');
    const result = await this.setupTotpUseCase.execute(accessToken);
    const response: SetupTotpResDto = { otpauthUrl: result.otpauthUrl };
    res.json(response);
  }

  @Post('mfa/totp/activate')
  @HttpCode(200)
  @ApiBody({ type: TotpActivateDto })
  @ApiResponse({ status: 200, type: ActivateTotpResDto })
  async activateTotp(@Req() req: Request, @Body() dto: TotpActivateDto, @Res() res: Response) {
    const accessToken = req.headers['authorization']?.replace('Bearer ', '');
    if (!accessToken) throw new Error('Missing access token');
    const result = await this.activateTotpUseCase.execute(accessToken, dto.token);
    const response: ActivateTotpResDto = { activated: result.activated };
    res.json(response);
  }

  @Post('logout')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: SuccessResDto })
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.logoutUseCase.execute(req, res);
    res.json({ success: true });
  }

  @Post('logout-all')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: SuccessResDto })
  async logoutAll(@Req() req: Request, @Res() res: Response) {
    await this.logoutAllUseCase.execute(req, res);
    res.json({ success: true });
  }
}
