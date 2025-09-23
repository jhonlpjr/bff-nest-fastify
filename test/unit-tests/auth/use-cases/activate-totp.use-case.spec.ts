import { AuthApiPort } from "../../../../src/modules/auth/application/ports/auth-api.port";
import { ActivateTotpUseCase } from "../../../../src/modules/auth/application/use-cases/activate-totp.use-case";


describe('ActivateTotpUseCase', () => {
  let useCase: ActivateTotpUseCase;
  let authApi: jest.Mocked<AuthApiPort>;

  beforeEach(() => {
    authApi = { activateTotp: jest.fn() } as any;
    useCase = new ActivateTotpUseCase(authApi);
  });

  it('should call AuthApiPort.activateTotp', async () => {
    authApi.activateTotp.mockResolvedValue({ activated: true });
    const result = await useCase.execute({ token: 'token' });
    expect(authApi.activateTotp).toHaveBeenCalledWith({ token: 'token' });
    expect(result).toEqual({ activated: true });
  });
});
