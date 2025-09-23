import { SecretsBootstrapService } from './src/common/services/secrets-bootstrap.service';

async function main() {
  await SecretsBootstrapService.injectSecrets();
  require('./src/main');
}

main();
