// StepUpMfaUseCase: esqueleto para MFA
import { MfaService } from '../ports/MfaService';
import { SessionRepository } from '../ports/SessionRepository';

export class StepUpMfaUseCase {
  constructor(
    private readonly mfaService: MfaService,
    private readonly sessionRepo: SessionRepository
  ) {}

  async execute(/* params */) {
    // TODO: implementar MFA step-up
  }
}
