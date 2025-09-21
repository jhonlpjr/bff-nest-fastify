import { ActivateTotpUseCase } from '../../../../src/modules/auth/application/use-cases/activate-totp.use-case';
import { AuthApiPort } from '../../../../src/modules/auth/application/ports/auth-api.port';

describe('ActivateTotpUseCase', () => {
  let useCase: ActivateTotpUseCase;
  let authApi: jest.Mocked<AuthApiPort>;

  beforeEach(() => {
    authApi = { activateTotp: jest.fn() } as any;
    useCase = new ActivateTotpUseCase(authApi);
  });

  it('should call AuthApiPort.activateTotp', async () => {
    authApi.activateTotp.mockResolvedValue({ activated: true });
    const result = await useCase.execute('access_token', 'token');
    expect(authApi.activateTotp).toHaveBeenCalledWith('access_token', 'token');
    expect(result).toEqual({ activated: true });
  });
});
