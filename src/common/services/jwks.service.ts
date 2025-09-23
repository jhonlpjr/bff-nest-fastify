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
    const url = process.env.AUTH_BASE_URL + '/.well-known/jwks.json';
    const { data } = await axios.get(url);
    // Extrae la primera clave pública (puedes ajustar si necesitas otra)
    if (data && Array.isArray(data.keys) && data.keys.length > 0) {
      this.publicKey = data.keys[0]; // O guarda solo lo que necesites
      this.logger.log('Public key loaded from AuthService');
    } else {
      this.logger.error('No keys found in JWKS response');
    }
  } catch (err) {
    this.logger.error('Failed to fetch public key from AuthService', err);
  }
}

  getPublicKey(): string | null {
    return this.publicKey;
  }
}
