import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';
import { LoggerModule } from 'nestjs-pino';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
      exports: [UtilsService],
      imports: [LoggerModule.forRoot({})],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should test if a name contains numbers, returning true', () => {
    const name = 'John Doe';
    expect(service.containsNumbers(name)).toBe(false);
  });

  it('should test if a name contains numbers, returning false', () => {
    const name = 'John Doe 123';
    expect(service.containsNumbers(name)).toBe(true);
  });

  it('should test if a number is prime, returning false for non primes', () => {
    const number = 10;
    expect(service.isPrime(number)).toBe(false);
  });

  it('should test if a number is prime, returning false for non primes, test for zero', () => {
    const number = 0;
    expect(service.isPrime(number)).toBe(false);
  });

  it('should test if a number is prime, returning false for non primes, test for one', () => {
    const number = 1;
    expect(service.isPrime(number)).toBe(false);
  });

  it('should test if a number is prime, returning false for non primes, test for 2', () => {
    const number = 2;
    expect(service.isPrime(number)).toBe(false);
  });

  it('should test if a number is prime, returning false for non primes, test for negative number', () => {
    const number = -2;
    expect(service.isPrime(number)).toBe(false);
  });

  it('should test if a number is prime, returning true for primes', () => {
    const number = 7;
    expect(service.isPrime(number)).toBe(true);
  });
});
