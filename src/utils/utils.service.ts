import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  constructor() {}

  public containsNumbers(name: string): boolean {
    for (let i = 0; i < 10; i++) {
      const number: string = i.toString();
      if (name.includes(number)) {
        return true;
      }
    }
    return false;
  }

  public isPrime(num): boolean {
    for (let i = 2, s = Math.sqrt(num); i < s + 1; i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  }
}
