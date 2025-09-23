import { LoginUseCase } from '../../../../src/modules/auth/application/use-cases/login.use-case';
import { AuthApiPort } from '../../../../src/modules/auth/application/ports/auth-api.port';
import { CookiesService } from '../../../../src/common/cookies/cookies.service';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let authApi: jest.Mocked<AuthApiPort>;
  let cookies: jest.Mocked<CookiesService>;
  let res: any;

  beforeEach(() => {
    authApi = { login: jest.fn() } as any;
    cookies = { setRefreshToken: jest.fn(), setUid: jest.fn() } as any;
    useCase = new LoginUseCase(authApi);
    res = {};
  });

  it('should call AuthApiPort.login and return result', async () => {
    authApi.login.mockResolvedValue({
      accessToken: 'at',
      refreshToken: 'rt',
      expiresIn: 123,
      scope: 'openid',
      aud: 'aud',
      userId: 'user1',
      tokenType: 'Bearer',
    });
    const params = { username: 'foo', password: 'bar' };
    const result = await useCase.execute(params);
    expect(authApi.login).toHaveBeenCalledWith(params);
    expect(result).toMatchObject({ accessToken: 'at', userId: 'user1' });
  });
});
