import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtDto } from './dto/jwt.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PinoLogger } from 'nestjs-pino';

@Controller('verify')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggerService: PinoLogger,
  ) {}

  @ApiTags('JWT verification')
  @ApiResponse({ status: 200, description: 'verdadeiro' })
  @ApiResponse({ status: 200, description: 'falso' })
  @ApiResponse({ status: 400, description: 'Error de entrada do usuario.' })
  @ApiResponse({ status: 500, description: 'Error no servidor.' })
  @Get('jwt')
  async verifyJWT(@Query('token') token: string): Promise<string> {
    try {
      this.loggerService.info(`Token: ${token}`);
      const jwt: JwtDto = this.appService.decodeJWT(token);

      await this.appService.verifyJWT(jwt);

      return 'verdadeiro';
    } catch (error) {
      this.loggerService.error(error);
      return 'falso';
    }
  }
}
