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
    useCase = new LoginUseCase(authApi, cookies);
    res = {};
  });

  it('should call AuthApiPort.login and set cookies', async () => {
    authApi.login.mockResolvedValue({
      access_token: 'at',
      refresh_token: 'rt',
      expires_in: 123,
      scope: 'openid',
      aud: 'aud',
      user_id: 'user1',
      token_type: 'Bearer',
    });
    const params = { username: 'foo', password: 'bar' };
    const result = await useCase.execute(params, res);
    expect(authApi.login).toHaveBeenCalledWith(params);
    expect(cookies.setRefreshToken).toHaveBeenCalledWith(res, 'rt');
    expect(cookies.setUid).toHaveBeenCalledWith(res, 'user1');
    expect(result).toMatchObject({ accessToken: 'at', userId: 'user1' });
  });
});
