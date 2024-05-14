import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { UtilsModule } from '../utils/utils.module';
import { JwtDto } from './dto/jwt.dto';
import { LoggerModule } from 'nestjs-pino';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
      imports: [UtilsModule, LoggerModule.forRoot({})],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should execute correctly given a correct jwt', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJTZWVkIjoiNzg0MSIsIk5hbWUiOiJUb25pbmhvIEFyYXVqbyJ9.QY05sIjtrcJnP533kQNk8QXcaleJ1Q01jWY_ZzIZuAg';
    const jwt: JwtDto = service.decodeJWT(token);
    expect(await service.verifyJWT(jwt)).toBe(void 0);
  });

  it('should decode jwt given a correct token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJTZWVkIjoiNzg0MSIsIk5hbWUiOiJUb25pbmhvIEFyYXVqbyJ9.QY05sIjtrcJnP533kQNk8QXcaleJ1Q01jWY_ZzIZuAg';
    const jwt = JSON.stringify({
      Role: 'Admin',
      Seed: 7841,
      Name: 'Toninho Araujo',
    });
    expect(JSON.stringify(service.decodeJWT(token))).toBe(jwt);
  });

  it('should thrown an error given a incorrect jwt', () => {
    const token =
      'eyJhbGciOiJzI1NiJ9.dfsdfsfryJSr2xrIjoiQWRtaW4iLCJTZrkIjoiNzg0MSIsIk5hbrUiOiJUb25pbmhvIEFyYXVqbyJ9.QY05fsdfsIjtrcJnP533kQNk8QXcaleJ1Q01jWY_ZzIZuAg';
    try {
      service.decodeJWT(token);
    } catch (error) {
      const isInvalidJson = error.message.indexOf('Unexpected token') > -1;
      expect(isInvalidJson).toBe(true);
    }
  });
});
