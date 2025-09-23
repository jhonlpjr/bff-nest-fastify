import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../../src/modules/auth/interface/http/auth.controller';
import { LoginUseCase } from '../../../../src/modules/auth/application/use-cases/login.use-case';
import { RefreshUseCase } from '../../../../src/modules/auth/application/use-cases/refresh.use-case';
import { VerifyMfaUseCase } from '../../../../src/modules/auth/application/use-cases/verify-mfa.use-case';
import { SetupTotpUseCase } from '../../../../src/modules/auth/application/use-cases/setup-totp.use-case';
import { ActivateTotpUseCase } from '../../../../src/modules/auth/application/use-cases/activate-totp.use-case';
import { LogoutUseCase } from '../../../../src/modules/auth/application/use-cases/logout.use-case';
import { LogoutAllUseCase } from '../../../../src/modules/auth/application/use-cases/logout-all.use-case';
import { JwksService } from '../../../../src/common/services/jwks.service';
import { CookiesService } from '../../../../src/common/cookies/cookies.service';

// Mocks
const loginUseCase = { execute: jest.fn() };
const refreshUseCase = { execute: jest.fn() };
const verifyMfaUseCase = { execute: jest.fn() };
const setupTotpUseCase = { execute: jest.fn() };
const activateTotpUseCase = { execute: jest.fn() };
const logoutUseCase = { execute: jest.fn() };
const logoutAllUseCase = { execute: jest.fn() };

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: LoginUseCase, useValue: loginUseCase },
        { provide: RefreshUseCase, useValue: refreshUseCase },
        { provide: VerifyMfaUseCase, useValue: verifyMfaUseCase },
        { provide: SetupTotpUseCase, useValue: setupTotpUseCase },
        { provide: ActivateTotpUseCase, useValue: activateTotpUseCase },
        { provide: LogoutUseCase, useValue: logoutUseCase },
        { provide: LogoutAllUseCase, useValue: logoutAllUseCase },
        { provide: JwksService, useValue: { getPublicKey: jest.fn(() => 'publicKey') } },
        { provide: CookiesService, useValue: { setRefreshToken: jest.fn(), setUid: jest.fn(), clearAll: jest.fn() } },
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login should call use case and return response', async () => {
    loginUseCase.execute.mockResolvedValue({ userId: 'u', accessToken: 'at' });
    const dto = { username: 'foo', password: 'bar' };
    const result = await controller.login(dto as any);
    expect(loginUseCase.execute).toHaveBeenCalledWith(expect.any(Object));
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });

  it('refresh should call use case and return response', async () => {
    refreshUseCase.execute.mockResolvedValue({ userId: 'u', accessToken: 'at' });
    const req = { cookies: { refreshToken: 'rt', uid: 'signedUid' }, user: { userId: 'u' }, unsignCookie: jest.fn(() => ({ valid: true, value: 'u', renew: false })) };
    const result = await controller.refresh(req as any);
    expect(refreshUseCase.execute).toHaveBeenCalledWith(expect.any(Object));
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });

  it('verifyMfa should call use case and return response', async () => {
    verifyMfaUseCase.execute.mockResolvedValue({ userId: 'u', accessToken: 'at' });
    const dto = { code: '123456', login_tx: 'tx' };
    const result = await controller.verifyMfa(dto as any);
    expect(verifyMfaUseCase.execute).toHaveBeenCalledWith(dto);
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });

  it('setupTotp should call use case and return response', async () => {
    setupTotpUseCase.execute.mockResolvedValue({ otpauthUrl: 'url' });
    const result = await controller.setupTotp('at', { userId: 'u' } as any);
    expect(setupTotpUseCase.execute).toHaveBeenCalledWith(expect.any(Object));
    expect(result.success).toBe(true);
    expect(result.data.otpauthUrl).toBe('url');
  });

  it('activateTotp should call use case and return response', async () => {
    activateTotpUseCase.execute.mockResolvedValue({ activated: true });
    const result = await controller.activateTotp('at', { code: '123456' } as any);
    expect(activateTotpUseCase.execute).toHaveBeenCalledWith(expect.any(Object));
    expect(result.success).toBe(true);
    expect(result.data.activated).toBe(true);
  });

  it('logout should call use case and return response', async () => {
    logoutUseCase.execute.mockResolvedValue(undefined);
    const result = await controller.logout({ userId: 'u' });
    expect(logoutUseCase.execute).toHaveBeenCalledWith(expect.any(Object));
    expect(result.success).toBe(true);
  });

  it('logoutAll should call use case and return response', async () => {
    logoutAllUseCase.execute.mockResolvedValue(undefined);
    const result = await controller.logoutAll({ userId: 'u' });
    expect(logoutAllUseCase.execute).toHaveBeenCalledWith(expect.any(Object));
    expect(result.success).toBe(true);
  });
});
