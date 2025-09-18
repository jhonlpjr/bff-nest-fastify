import { Controller, Req, Res, All, UseGuards, Inject } from '@nestjs/common';
import type { ProxyUseCase } from '../../application/use-cases/ProxyUseCase';
import { SessionGuard } from '../guards/session.guard';
import { CsrfGuard } from '../guards/csrf.guard';

@Controller('api/movies')
export class MoviesController {
  constructor(@Inject('ProxyUseCase') private readonly proxyUseCase: ProxyUseCase) {}

  @All('*')
  @UseGuards(SessionGuard)
  async proxy(@Req() req, @Res() res) {
    // Determinar si requiere CSRF según método
    // ...llamar ProxyUseCase y devolver status/headers/body...
  }
}
