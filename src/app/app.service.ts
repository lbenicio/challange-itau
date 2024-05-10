import { Injectable } from '@nestjs/common';
import { JwtDto } from './dto/jwt.dto';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class AppService {
  private claims = ['Role', 'Seed', 'Name'];

  constructor(private readonly utilsService: UtilsService) {}

  public decodeJWT(token: string): JwtDto {
    const jwt: JwtDto = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );
    return jwt;
  }

  public verifyJWT(jwt: JwtDto): void {
    this.verifyClaims(jwt);
    this.verifyName(jwt.Name);
    this.verifySeed(jwt.Seed);
  }

  private verifyClaims(jwt: JwtDto) {
    const keys = Object.keys(jwt);

    if (keys.length !== 3) {
      throw new Error('Token must have exactly 3 claims');
    } else {
      keys.forEach((key) => {
        if (!this.claims.includes(key)) {
          throw new Error('Tokens must not have claim: ' + key);
        }
      });
    }
  }

  private verifyName(name: string): void {
    if (this.utilsService.containsNumbers(name)) {
      throw new Error('Name must not contain numbers');
    }
  }

  private verifySeed(seed: number): void {
    if (!this.utilsService.isPrime(seed)) {
      throw new Error('Seed must be a prime number');
    }
  }
}
