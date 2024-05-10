import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtDto } from './dto/jwt.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('verify')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('JWT verification')
  @ApiResponse({ status: 200, description: 'verdadeiro' })
  @ApiResponse({ status: 200, description: 'falso' })
  @ApiResponse({ status: 400, description: 'Error de entrada do usuario.' })
  @ApiResponse({ status: 500, description: 'Error no servidor.' })
  @Get('jwt')
  verifyJWT(@Param('jwt') token: string): string {
    try {
      const jwt: JwtDto = this.appService.decodeJWT(token);
      this.appService.verifyJWT(jwt);

      return 'verdadeiro';
    } catch (error) {
      console.error(error);
      return 'falso';
    }
  }
}
