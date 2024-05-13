import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from '../utils/utils.module';
import { LoggerModule } from 'nestjs-pino';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [UtilsModule, LoggerModule.forRoot({})],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('verifyJWT', () => {
    it('should return "verdadeiro" upon submit of correct token', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJTZWVkIjoiNzg0MSIsIk5hbWUiOiJUb25pbmhvIEFyYXVqbyJ9.QY05sIjtrcJnP533kQNk8QXcaleJ1Q01jWY_ZzIZuAg';
      expect(await appController.verifyJWT(token)).toBe('verdadeiro');
    });

    it('should return "falso" upon submit of invalid token', async () => {
      const token =
        'eyJhbGciOiJzI1NiJ9.dfsdfsfryJSr2xrIjoiQWRtaW4iLCJTZrkIjoiNzg0MSIsIk5hbrUiOiJUb25pbmhvIEFyYXVqbyJ9.QY05fsdfsIjtrcJnP533kQNk8QXcaleJ1Q01jWY_ZzIZuAg';
      expect(await appController.verifyJWT(token)).toBe('falso');
    });

    it('should return "falso" upon submit of invalid claim name, containing numbers', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiRXh0ZXJuYWwiLCJTZWVkIjoiODgwMzciLCJOYW1lIjoiTTRyaWEgT2xpdmlhIn0.6YD73XWZYQSSMDf6H0i3-kylz1-TY_Yt6h1cV2Ku-Qs';
      expect(await appController.verifyJWT(token)).toBe('falso');
    });

    it('should return "falso" upon submit of invalid token, containing more then 3 claims', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiTWVtYmVyIiwiT3JnIjoiQlIiLCJTZWVkIjoiMTQ2MjciLCJOYW1lIjoiVmFsZGlyIEFyYW5oYSJ9.cmrXV_Flm5mfdpfNUVopY_I2zeJUy4EZ4i3Fea98zvY';
      expect(await appController.verifyJWT(token)).toBe('falso');
    });

    it('should return "falso" upon submit of invalid token, containing claims with invalid keys', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiTWVtYmVyIiwiT3JnIjoiQlIiLCJOYW1lIjoiVmFsZGlyIEFyYW5oYSJ9.4qfyQARqy9iHbc46MkIRUzXy1VktbltUfd1jEUx1HjY';
      expect(await appController.verifyJWT(token)).toBe('falso');
    });

    it('should return "falso" upon submit of invalid token, containing name with more then allowed length', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJTZWVkIjoiNzg0MSIsIk5hbWUiOiJQcm9pZGVudCB1dCBzdW50IGNpbGx1bSBtb2xsaXQgZG9sb3IgcXVpcyBkb2xvciBxdWkgZXhlcmNpdGF0aW9uIHByb2lkZW50IG5pc2kgZXNzZSBpbmNpZGlkdW50IGV4LiBQYXJpYXR1ciBhZGlwaXNpY2luZyByZXByZWhlbmRlcml0IG51bGxhIExvcmVtLiBTdW50IHRlbXBvciByZXByZWhlbmRlcml0IGluY2lkaWR1bnQgdXQgYXV0ZSBub3N0cnVkIHF1aS4gRXN0IHN1bnQgdmVuaWFtIHZlbmlhbSBlaXVzbW9kIGNvbnNlcXVhdCB2b2x1cHRhdGUgc3VudC4ifQ.6nVe8LRfrEsjZWLX_XwombZOVYV3HcmMmmsvb1hKStc';
      expect(await appController.verifyJWT(token)).toBe('falso');
    });

    it('should return "falso" upon submit of invalid token, containing invalid prime number', async () => {
      const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJTZWVkIjoiNiIsIk5hbWUiOiJUb25pbmhvIEFyYXVqbyJ9.YiwB2Ii1SN2OJMVZAKb_AVQ-n69JAyyvv17Xmenqj1I';
      expect(await appController.verifyJWT(token)).toBe('falso');
    });
  });
});
