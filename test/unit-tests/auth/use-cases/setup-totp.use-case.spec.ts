import { SetupTotpUseCase } from '../../../../src/modules/auth/application/use-cases/setup-totp.use-case';
import { AuthApiPort } from '../../../../src/modules/auth/application/ports/auth-api.port';

describe('SetupTotpUseCase', () => {
  let useCase: SetupTotpUseCase;
  let authApi: jest.Mocked<AuthApiPort>;

  beforeEach(() => {
    authApi = { setupTotp: jest.fn() } as any;
    useCase = new SetupTotpUseCase(authApi);
  });

  it('should call AuthApiPort.setupTotp', async () => {
    authApi.setupTotp.mockResolvedValue({ otpauthUrl: 'otpauth://totp/issuer:user?secret=ABC' });
    const result = await useCase.execute('access_token');
    expect(authApi.setupTotp).toHaveBeenCalledWith('access_token');
    expect(result).toEqual({ otpauthUrl: 'otpauth://totp/issuer:user?secret=ABC' });
  });
});
