import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from '../config/app.config';
import loggerConfig from '../config/logger.config';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [
    UtilsModule,
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: {
          transport: {
            target: 'pino-pretty',
            options: {
              singleLine: true,
              level: configService.get<string>('logger.level'),
              context: configService.get<string>('logger.context'),
            },
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [appConfig, loggerConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
