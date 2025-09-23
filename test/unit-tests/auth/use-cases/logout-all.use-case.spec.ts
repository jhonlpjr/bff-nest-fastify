import { LogoutAllUseCase } from '../../../../src/modules/auth/application/use-cases/logout-all.use-case';
import { AuthApiPort } from '../../../../src/modules/auth/application/ports/auth-api.port';

describe('LogoutAllUseCase', () => {
  let useCase: LogoutAllUseCase;
  let authApi: jest.Mocked<AuthApiPort>;

  beforeEach(() => {
    authApi = { revoke: jest.fn() } as any;
    useCase = new LogoutAllUseCase(authApi);
  });

  it('should call AuthApiPort.revoke if userId exists', async () => {
    const params = { userId: 'user1' };
    await useCase.execute(params);
    expect(authApi.revoke).toHaveBeenCalledWith(params);
  });

  it('should not call revoke if no userId', async () => {
    const params = {};
    await useCase.execute(params);
    expect(authApi.revoke).not.toHaveBeenCalled();
  });

  it('should return success true', async () => {
    const params = { userId: 'user1' };
    const result = await useCase.execute(params);
    expect(result).toEqual({ success: true });
  });
});