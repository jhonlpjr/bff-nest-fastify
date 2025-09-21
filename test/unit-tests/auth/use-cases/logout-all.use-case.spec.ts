import { LogoutAllUseCase } from '../../../../src/modules/auth/application/use-cases/logout-all.use-case';
import { AuthApiPort } from '../../../../src/modules/auth/application/ports/auth-api.port';
import { CookiesService } from '../../../../src/common/cookies/cookies.service';

describe('LogoutAllUseCase', () => {
  let useCase: LogoutAllUseCase;
  let authApi: jest.Mocked<AuthApiPort>;
  let cookies: jest.Mocked<CookiesService>;
  let req: any;
  let res: any;

  beforeEach(() => {
    authApi = { revoke: jest.fn() } as any;
    cookies = { getUid: jest.fn(), clearAll: jest.fn() } as any;
    useCase = new LogoutAllUseCase(authApi, cookies);
    req = {};
    res = {};
  });

  it('should call AuthApiPort.revoke if userId exists', async () => {
    cookies.getUid.mockReturnValue('user1');
    await useCase.execute(req, res);
    expect(authApi.revoke).toHaveBeenCalledWith({ userId: 'user1' });
    expect(cookies.clearAll).toHaveBeenCalledWith(res);
  });

  it('should not call revoke if no userId', async () => {
    cookies.getUid.mockReturnValue(undefined);
    await useCase.execute(req, res);
    expect(authApi.revoke).not.toHaveBeenCalled();
    expect(cookies.clearAll).toHaveBeenCalledWith(res);
  });
});
