import { VerifyMfaUseCase } from '../../../../src/modules/auth/application/use-cases/verify-mfa.use-case';
import { AuthApiPort } from '../../../../src/modules/auth/application/ports/auth-api.port';

describe('VerifyMfaUseCase', () => {
  let useCase: VerifyMfaUseCase;
  let authApi: jest.Mocked<AuthApiPort>;

  beforeEach(() => {
    authApi = { verifyMfa: jest.fn() } as any;
    useCase = new VerifyMfaUseCase(authApi);
  });

  it('should call AuthApiPort.verifyMfa', async () => {
    authApi.verifyMfa.mockResolvedValue({
      accessToken: 'at',
      refreshToken: 'rt',
      expiresIn: 123,
      scope: 'openid',
      aud: 'aud',
      userId: 'user1',
      tokenType: 'Bearer',
    });
    const params = { token: '123456', login_tx: 'tx1' };
    const result = await useCase.execute(params);
    expect(authApi.verifyMfa).toHaveBeenCalledWith(params);
    expect(result).toMatchObject({ accessToken: 'at', userId: 'user1' });
  });
});
