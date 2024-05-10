import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { UtilsModule } from '../utils/utils.module';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
      imports: [UtilsModule],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
