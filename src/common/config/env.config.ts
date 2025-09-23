import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('env', () => ({
  AUTH_BASE_URL: process.env.AUTH_BASE_URL,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
  COOKIE_SAMESITE: process.env.COOKIE_SAMESITE || 'lax',
  COOKIE_SECURE: process.env.COOKIE_SECURE === 'true',
  REFRESH_COOKIE_NAME: process.env.REFRESH_COOKIE_NAME || 'refreshToken',
  REFRESH_COOKIE_MAX_AGE_MS: process.env.REFRESH_COOKIE_MAX_AGE_MS ? Number(process.env.REFRESH_COOKIE_MAX_AGE_MS) : undefined,
  FRONT_ORIGIN: process.env.FRONT_ORIGIN,
}));

export const envValidationSchema = Joi.object({
  AUTH_BASE_URL: Joi.string().uri().required(),
  COOKIE_DOMAIN: Joi.string().optional(),
  COOKIE_SAMESITE: Joi.string().valid('lax', 'strict', 'none').default('lax'),
  COOKIE_SECURE: Joi.boolean().optional(),
  REFRESH_COOKIE_NAME: Joi.string().default('refreshToken'),
  REFRESH_COOKIE_MAX_AGE_MS: Joi.number().optional(),
  FRONT_ORIGIN: Joi.string().uri().required(),
});

/**
 * Ejemplo de .env.local:
 * AUTH_BASE_URL=http://localhost:6080/api/v1
 * BFF_CLIENT_KEY=dev_bff_key_123
 * COOKIE_DOMAIN=localhost
 * COOKIE_SAMESITE=lax
 * FRONT_ORIGIN=http://localhost:3000
 * # COOKIE_SECURE=true
 * # REFRESH_COOKIE_MAX_AGE_MS=2592000000
 */
