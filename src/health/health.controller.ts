import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { PinoLogger } from 'nestjs-pino';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly loggerService: PinoLogger,
  ) {}

  @Get('check')
  @HealthCheck()
  check() {
    this.loggerService.debug('ping test');
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    ]);
  }

  @Get('ping')
  ping() {
    this.loggerService.debug('pong');
    return 'pong';
  }
}
