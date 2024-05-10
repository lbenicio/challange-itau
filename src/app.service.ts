import { Injectable } from '@nestjs/common';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class AppService {
  private maxNameLength = 256;

  public verifyJWT(jwt: JwtDto): void {
    this.verifyName(jwt.Name);
    this.verifySeed(jwt.Seed);
  }

  private verifyName(name: string): void {
    if (this.doNameContainsNumbers(name)) {
      throw new Error('Name must not contain numbers');
    } else if (!this.doNamesHaveCorrectLength(name)) {
      throw new Error(
        'Name must have between 1 and ' + this.maxNameLength + ' characters',
      );
    }
  }

  private doNameContainsNumbers(name: string): boolean {
    for (let i = 0; i < 10; i++) {
      const number: string = i.toString();
      if (name.includes(number)) {
        return true;
      }
    }
    return false;
  }

  private doNamesHaveCorrectLength(name: string): boolean {
    return name.length > 0 && name.length < this.maxNameLength;
  }

  private verifySeed(seed: number): void {
    if (!this.isPrime(seed)) {
      throw new Error('Seed must be a prime number');
    }
  }

  private isPrime(num): boolean {
    for (let i = 2, s = Math.sqrt(num); i < s + 1; i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  }
}
