import { UserLogged } from '../../../../common/decorators/user-logged.decorator';
import { BearerToken } from '../../../../common/decorators/bearer-token.decorator';

import { Controller, Post, Body, Req, HttpCode, UseInterceptors } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { MfaVerifyDto } from './dtos/requests/mfa-verify-request.dto';
import { TotpActivateDto } from './dtos/requests/totp-activate-request.dto';
import { LoginResDto } from './dtos/responses/login.res.dto';
import { MfaLoginResDTO } from './dtos/responses/mfa-login.res.dto';
import { SetupTotpResDto } from './dtos/responses/setup-totp.res.dto';
import { ActivateTotpResDto } from './dtos/responses/activate-totp.res.dto';
import { SuccessResDto } from './dtos/responses/success.res.dto';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RefreshUseCase } from '../../application/use-cases/refresh.use-case';
import { RefreshRequestMapper } from './mappers/api-refresh.mapper';
import { VerifyMfaUseCase } from '../../application/use-cases/verify-mfa.use-case';
import { SetupTotpUseCase } from '../../application/use-cases/setup-totp.use-case';
import { ActivateTotpUseCase } from '../../application/use-cases/activate-totp.use-case';
import { LogoutUseCase } from '../../application/use-cases/logout.use-case';
import { LogoutAllUseCase } from '../../application/use-cases/logout-all.use-case';
import { LogoutRequestDto } from './dtos/requests/logout-request.dto';
import { LogoutAllRequestMapper } from './mappers/logout-all-request.mapper';
import { AuthCookiesInterceptor } from '../../../../common/interceptors/auth-cookies.interceptor';
import { ApiTags, ApiBody, ApiOkResponse, getSchemaPath, ApiExtraModels, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiCookieAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../../../common/guards/jwt.guard';
import { ResponseMapper } from '../../../../common/mappers/response.mapper';
import { OkResponse } from '../../../../common/api/responses/ok-response';
import { ErrorResponse } from '../../../../common/api/responses/error-response';
import { ApiLoginMapper } from './mappers/api-login.mapper';
import { LoginRequestDto } from './dtos/requests/login-request.dto';
import { SetupTotpRequestDto } from './dtos/requests/setup-totp-request.dto';
import { SetupTotpRequestMapper } from './mappers/setup-totp-request.mapper';
import { ActivateTotpRequestMapper } from './mappers/activate-totp-request.mapper';
import { LogoutRequestMapper } from './mappers/logout-request.mapper';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(AuthCookiesInterceptor)
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshUseCase: RefreshUseCase,
    private readonly verifyMfaUseCase: VerifyMfaUseCase,
    private readonly setupTotpUseCase: SetupTotpUseCase,
    private readonly activateTotpUseCase: ActivateTotpUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly logoutAllUseCase: LogoutAllUseCase,
  ) { }

  @Post('login')
  @HttpCode(200)
  @ApiExtraModels(OkResponse, LoginResDto, MfaLoginResDTO)
  @ApiBody({ type: LoginRequestDto })
  @ApiOkResponse({
    description: 'Successful login or MFA required',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponse) },
        {
          properties: {
            data: {
              oneOf: [
                { $ref: getSchemaPath(LoginResDto) },
                { $ref: getSchemaPath(MfaLoginResDTO) },
              ],
            },
          },
        },
      ],
    },
    examples: {
      login: {
        summary: 'Successful login',
        value: {
          success: true,
          data: {
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
      },
      mfa: {
        summary: 'MFA required',
        value: {
          success: true,
          data: {
            step: 'mfa',
            login_tx: 'login-transaction-id',
            mfa: { types: ['totp', 'sms'] },
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error', type: ErrorResponse })
  async login(@Body() dto: LoginRequestDto) {
    const loginDto = ApiLoginMapper.fromBody(dto);
    const result = await this.loginUseCase.execute(loginDto);
    // Las cookies deben ser seteadas por un interceptor o en el ResponseMapper si es necesario
    const loginResponse = ApiLoginMapper.toResponse(result);
    return ResponseMapper.okResponse(loginResponse);
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiExtraModels(OkResponse, LoginResDto)
  @ApiCookieAuth('refreshToken')
  @ApiOkResponse({
    description: 'Refresh token',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(LoginResDto) },
          },
        },
      ],
    },
    example: {
      success: true,
      data: {
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
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error', type: ErrorResponse })
  async refresh(@Req() req: FastifyRequest) {
    const dto = RefreshRequestMapper.fromRequest(req);
    const result = await this.refreshUseCase.execute(dto);
    return ResponseMapper.okResponse(result);
  }

  @Post('mfa/verify')
  @HttpCode(200)
  @ApiExtraModels(OkResponse, LoginResDto)
  @ApiBody({ type: MfaVerifyDto })
  @ApiOkResponse({
    description: 'Verify MFA',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(LoginResDto) },
          },
        },
      ],
    },
    example: {
      success: true,
      data: {
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
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error', type: ErrorResponse })
  async verifyMfa(@Body() dto: MfaVerifyDto) {
    const result = await this.verifyMfaUseCase.execute(dto);
    return ResponseMapper.okResponse(result);
  }

  @Post('mfa/totp/setup')
  @HttpCode(200)
  @ApiExtraModels(OkResponse, SetupTotpResDto)
  @ApiOkResponse({
    description: 'Setup TOTP',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(SetupTotpResDto) },
          },
        },
      ],
    },
    example: {
      success: true,
      data: {
        otpauthUrl: 'otpauth://totp/Example:user@example.com?...',
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error', type: ErrorResponse })
  async setupTotp(@BearerToken() accessToken: string, @Body() dto: SetupTotpRequestDto) {
    const params = SetupTotpRequestMapper.fromRequest(accessToken, dto);
    const result = await this.setupTotpUseCase.execute(params);
    return ResponseMapper.okResponse({ otpauthUrl: result.otpauthUrl });
  }

  @Post('mfa/totp/activate')
  @HttpCode(200)
  @ApiExtraModels(OkResponse, ActivateTotpResDto)
  @ApiBody({ type: TotpActivateDto })
  @ApiOkResponse({
    description: 'Activate TOTP',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(ActivateTotpResDto) },
          },
        },
      ],
    },
    example: {
      success: true,
      data: {
        activated: true,
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponse })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error', type: ErrorResponse })
  async activateTotp(@BearerToken() accessToken: string, @Body() dto: TotpActivateDto) {
    const params = ActivateTotpRequestMapper.fromRequest(accessToken, dto);
    const result = await this.activateTotpUseCase.execute(params);
    return ResponseMapper.okResponse({ activated: result.activated });
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  @HttpCode(200)
  @ApiExtraModels(OkResponse, SuccessResDto)
  @ApiOkResponse({
    description: 'Logout',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(SuccessResDto) },
          },
        },
      ],
    },
    example: {
      success: true,
      data: {},
    },
  })
  async logout(@UserLogged() user) {
    const dto: LogoutRequestDto = LogoutRequestMapper.fromUser(user);
    await this.logoutUseCase.execute(dto);
    return ResponseMapper.okResponse({});
  }

  @Post('logout-all')
  @UseGuards(JwtGuard)
  @HttpCode(200)
  @ApiExtraModels(OkResponse, SuccessResDto)
  @ApiOkResponse({
    description: 'Logout all',
    schema: {
      allOf: [
        { $ref: getSchemaPath(OkResponse) },
        {
          properties: {
            data: { $ref: getSchemaPath(SuccessResDto) },
          },
        },
      ],
    },
    example: {
      success: true,
      data: {},
    },
  })
  async logoutAll(@UserLogged() user) {
    const dto: LogoutRequestDto = LogoutAllRequestMapper.fromUser(user);
    await this.logoutAllUseCase.execute(dto);
    return ResponseMapper.okResponse({});
  }
}
