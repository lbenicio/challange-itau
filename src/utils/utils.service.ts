import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class UtilsService {
  constructor(private readonly loggerService: PinoLogger) {}
  public isPrime(num): boolean {
    this.loggerService.debug(`num: ${num}`);
    for (let i = 2, s = Math.sqrt(num); i < s + 1; i++) {
      this.loggerService.debug(`${i}: ${num % i}`);
      if (num % i === 0) return false;
    }
    return num > 1;
  }
}
