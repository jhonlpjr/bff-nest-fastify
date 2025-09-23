import { AUTH_SERVICE_CLIENT_KEY } from '../constants/keys.constants';
import { SecretManagerService } from './secret-manager.service';
import * as dotenv from 'dotenv';
dotenv.config();
/**
 * Servicio utilitario para cargar y setear variables secretas desde AWS Secrets Manager
 * antes de iniciar la app. Puedes agregar aquí todas las variables secretas que necesites.
 */
export class SecretsBootstrapService {
  static async injectSecrets() {
    const secretManager = new SecretManagerService();
    // Lista de secretos a cargar: clave = nombre en process.env, valor = nombre en AWS
    const secretsToLoad: Record<string, string> = {
      AUTH_SERVICE_CLIENT_KEY: AUTH_SERVICE_CLIENT_KEY, // Ejemplo
      // Agrega aquí más secretos si lo necesitas
      // OTRA_SECRETA: 'NOMBRE_EN_AWS',
    };
    for (const [envKey, awsKey] of Object.entries(secretsToLoad)) {
      if (!process.env[envKey]) {
        const secret = await secretManager.getSecret(awsKey);
        if (secret) {
          process.env[envKey] = secret;
        }
      }
    }
  }
}
