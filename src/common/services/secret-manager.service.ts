import { Injectable, Logger } from '@nestjs/common';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

/**
 * Servicio para consultar secretos desde AWS Secrets Manager.
 */
@Injectable()
export class SecretManagerService {
  private readonly logger = new Logger(SecretManagerService.name);
  private readonly client: SecretsManagerClient;

  constructor() {
    const region = process.env.AWS_REGION;
    const endpoint = process.env.AWS_ENDPOINT;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    this.client = new SecretsManagerClient({
      region,
      endpoint,
      credentials: accessKeyId && secretAccessKey ? {
        accessKeyId,
        secretAccessKey,
      } : undefined,
    });
  }

  async getSecret(secretName: string): Promise<string | null> {
    try {
      const command = new GetSecretValueCommand({ SecretId: secretName });
      const response = await this.client.send(command);
      if (response.SecretString) {
        return response.SecretString;
      }
      // Si el secreto es binario, puedes manejarlo aquí si lo necesitas
      return null;
    } catch (error) {
      this.logger.error(`Error consultando secreto ${secretName}:`, error);
      return null;
    }
  }
}
