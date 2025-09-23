import * as Joi from 'joi';

export const appValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  AUTH_BASE_URL: Joi.string().uri().required(),
  COOKIE_DOMAIN: Joi.string().required(),
  COOKIE_SAMESITE: Joi.string().valid('lax', 'strict', 'none').default('lax'),
  FRONT_ORIGIN: Joi.string().uri().optional(),
  CORS_ORIGINS: Joi.string().required(),
  AUTH_SERVICE_CLIENT_KEY: Joi.string().required(),
});
