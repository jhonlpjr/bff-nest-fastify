import { RefreshUseCase } from '../../../../src/modules/auth/application/use-cases/refresh.use-case';
import { AuthApiPort } from '../../../../src/modules/auth/application/ports/auth-api.port';
import { CookiesService } from '../../../../src/common/cookies/cookies.service';

describe('RefreshUseCase', () => {
  let useCase: RefreshUseCase;
  let authApi: jest.Mocked<AuthApiPort>;
  let cookies: jest.Mocked<CookiesService>;
  let req: any;
  let res: any;

  beforeEach(() => {
    authApi = { refreshToken: jest.fn() } as any;
    cookies = { getRefreshToken: jest.fn(), getUid: jest.fn(), setRefreshToken: jest.fn() } as any;
    useCase = new RefreshUseCase(authApi, cookies);
    req = {};
    res = {};
  });

  it('should throw if no refreshToken or userId', async () => {
    cookies.getRefreshToken.mockReturnValue(undefined);
    cookies.getUid.mockReturnValue(undefined);
    await expect(useCase.execute(req, res)).rejects.toThrow('Unauthorized');
  });

  it('should call AuthApiPort.refreshToken and set cookie', async () => {
    cookies.getRefreshToken.mockReturnValue('rt');
    cookies.getUid.mockReturnValue('user1');
    authApi.refreshToken.mockResolvedValue({
      access_token: 'at',
      refresh_token: 'rt2',
      expires_in: 123,
      scope: 'openid',
      aud: 'aud',
      user_id: 'user1',
      token_type: 'Bearer',
    });
    const result = await useCase.execute(req, res);
    expect(authApi.refreshToken).toHaveBeenCalledWith({ userId: 'user1', refreshToken: 'rt' });
    expect(cookies.setRefreshToken).toHaveBeenCalledWith(res, 'rt2');
    expect(result).toMatchObject({ accessToken: 'at', userId: 'user1' });
  });
});
