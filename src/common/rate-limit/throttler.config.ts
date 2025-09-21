import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

export const ThrottlerConfigModule = ThrottlerModule.forRoot({
  throttlers: [
    {
      ttl: Number(process.env.THROTTLE_TTL) || 60,
      limit: Number(process.env.THROTTLE_LIMIT) || 10,
    },
  ],
});

export const ThrottlerProvider = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};
