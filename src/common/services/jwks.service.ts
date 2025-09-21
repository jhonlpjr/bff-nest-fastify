import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class JwksService implements OnModuleInit {
  private publicKey: string | null = null;
  private readonly logger = new Logger(JwksService.name);

  async onModuleInit() {
    await this.fetchPublicKey();
  }

  async fetchPublicKey() {
    try {
      // Ajusta la URL según tu AuthService
      const url = process.env.AUTH_BASE_URL + '/.well-known/jwks.pem';
      const { data } = await axios.get(url);
      this.publicKey = data;
      this.logger.log('Public key loaded from AuthService');
    } catch (err) {
      this.logger.error('Failed to fetch public key from AuthService', err);
    }
  }

  getPublicKey(): string | null {
    return this.publicKey;
  }
}
