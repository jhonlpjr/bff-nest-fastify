import { SecretsBootstrapService } from './common/services/secrets-bootstrap.service';

export async function injectSecretsBeforeApp() {
  await SecretsBootstrapService.injectSecrets();
}
