import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtDto } from './dto/jwt.dto';

@Controller('verify')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('jwt')
  verifyJWT(@Param('jwt') jwt: JwtDto): string {
    try {
      this.appService.verifyJWT(jwt);

      return 'verdadeiro';
    } catch (error) {
      console.error(error);
      return 'falso';
    }
  }
}
