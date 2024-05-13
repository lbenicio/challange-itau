import { Injectable } from '@nestjs/common';
import { JwtDto } from './dto/jwt.dto';
import { UtilsService } from '../utils/utils.service';
import { PinoLogger } from 'nestjs-pino';
import { ValidationError, validate } from 'class-validator';

@Injectable()
export class AppService {
  constructor(
    private readonly utilsService: UtilsService,
    private readonly loggerService: PinoLogger,
  ) {}

  public decodeJWT(token: string): JwtDto {
    const jwt: JwtDto = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );
    this.loggerService.debug(`JWT: ${jwt}`);
    return jwt;
  }

  public async verifyJWT(jwt: JwtDto): Promise<void> {
    const errors: ValidationError[] = await validate(new JwtDto(jwt), {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    // errors is an array of validation errors
    if (errors.length > 0) {
      const msgs: string = errors.toString();
      this.loggerService.error('validation failed. errors: ', errors);
      throw new Error(msgs);
    } else {
      this.loggerService.error('validation succeed');
    }

    this.verifySeed(jwt.Seed);
  }

  private verifySeed(seed: number): void {
    this.loggerService.debug(`seed: ${seed}`);
    if (!this.utilsService.isPrime(seed)) {
      throw new Error('Seed must be a prime number');
    }
  }
}
