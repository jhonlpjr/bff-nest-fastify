import { LogoutUseCase } from '../../../../src/modules/auth/application/use-cases/logout.use-case';
import { AuthApiPort } from '../../../../src/modules/auth/application/ports/auth-api.port';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let authApi: jest.Mocked<AuthApiPort>;

  beforeEach(() => {
    authApi = { revoke: jest.fn() } as any;
    useCase = new LogoutUseCase(authApi);
  });

  it('should call AuthApiPort.revoke if jti exists', async () => {
    const dto = { jti: 'jti1' };
    await useCase.execute(dto);
    expect(authApi.revoke).toHaveBeenCalledWith({ jti: 'jti1' });
  });

  it('should not call revoke if no jti', async () => {
    const dto = {};
    await useCase.execute(dto);
    expect(authApi.revoke).not.toHaveBeenCalled();
  });

  it('should return success true', async () => {
    const dto = { jti: 'jti1' };
    const result = await useCase.execute(dto);
    expect(result).toEqual({ success: true });
  });
});