


const { SecretsBootstrapService } = require('./dist/src/common/services/secrets-bootstrap.service');

(async () => {
  await SecretsBootstrapService.injectSecrets();
  require('./dist/src/main');
})();
