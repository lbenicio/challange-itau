import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      imports: [TerminusModule, HttpModule],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return pong', () => {
    expect(controller.ping()).toBe('pong');
  });

  it('should check ping', async () => {
    const defaultHealthCheckResult = JSON.stringify({
      status: 'ok',
      info: { 'nestjs-docs': { status: 'up' } },
      error: {},
      details: { 'nestjs-docs': { status: 'up' } },
    });
    expect(JSON.stringify(await controller.check())).toBe(
      defaultHealthCheckResult,
    );
  });
});
