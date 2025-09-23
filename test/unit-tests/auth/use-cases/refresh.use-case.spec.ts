import { AuthApiPort } from "../../../../src/modules/auth/application/ports/auth-api.port";
import { RefreshUseCase } from "../../../../src/modules/auth/application/use-cases/refresh.use-case";


describe('RefreshUseCase', () => {
  let useCase: RefreshUseCase;
  let authApi: jest.Mocked<AuthApiPort>;

  beforeEach(() => {
    authApi = { refreshToken: jest.fn() } as any;
    useCase = new RefreshUseCase(authApi);
  });

  it('should throw UnauthorizedError if no refreshToken or userId', async () => {
    await expect(useCase.execute({})).rejects.toThrow('Invalid refresh token or user ID');
    await expect(useCase.execute({ refreshToken: 'rt' })).rejects.toThrow('Invalid refresh token or user ID');
    await expect(useCase.execute({ userId: 'user1' })).rejects.toThrow('Invalid refresh token or user ID');
  });

  it('should call AuthApiPort.refreshToken with correct params', async () => {
    authApi.refreshToken.mockResolvedValue({
      accessToken: 'at',
      refreshToken: 'rt2',
      expiresIn: 123,
      scope: 'openid',
      aud: 'aud',
      userId: 'user1',
      tokenType: 'Bearer',
    });
    const dto = { refreshToken: 'rt', userId: 'user1' };
    const result = await useCase.execute(dto);
    expect(authApi.refreshToken).toHaveBeenCalledWith({ userId: 'user1', refreshToken: 'rt' });
    expect(result).toMatchObject({ accessToken: 'at', userId: 'user1' });
  });
});
