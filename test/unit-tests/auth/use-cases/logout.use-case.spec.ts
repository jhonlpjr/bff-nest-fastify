import { LogoutUseCase } from '../../../../src/modules/auth/application/use-cases/logout.use-case';
import { AuthApiPort } from '../../../../src/modules/auth/application/ports/auth-api.port';
import { CookiesService } from '../../../../src/common/cookies/cookies.service';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let authApi: jest.Mocked<AuthApiPort>;
  let cookies: jest.Mocked<CookiesService>;
  let req: any;
  let res: any;

  beforeEach(() => {
    authApi = { revoke: jest.fn() } as any;
    cookies = { clearAll: jest.fn() } as any;
    useCase = new LogoutUseCase(authApi, cookies);
    req = { user: { jti: 'jti1' } };
    res = {};
  });

  it('should call AuthApiPort.revoke if jti exists', async () => {
    await useCase.execute(req, res);
    expect(authApi.revoke).toHaveBeenCalledWith({ jti: 'jti1' });
    expect(cookies.clearAll).toHaveBeenCalledWith(res);
  });

  it('should not call revoke if no jti', async () => {
    req.user = undefined;
    await useCase.execute(req, res);
    expect(authApi.revoke).not.toHaveBeenCalled();
    expect(cookies.clearAll).toHaveBeenCalledWith(res);
  });
});
