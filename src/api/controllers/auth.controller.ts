import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { LoginRequestDto } from '../schema/dto/login-request.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SignupUserDto } from '../schema/dto/signup-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Register',
    description:
      'Signs In the user. This operation will require the correct ' +
      'credentials in the query body (email and password). After validating' +
      ' and authenticating those user credentials, tokens will be generated ' +
      'and returned to user for usage.',
  })
  @ApiOkResponse({
    description: 'User data successfully fetched.',
  })
  @Post('signup')
  async signup(@Body() signUpDto: SignupUserDto) {
    return this.authService.register(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginReq: LoginRequestDto) {
    return this.authService.login(loginReq);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async profile(@Request() req: any) {
    return this.authService.getProfile(req.headers.authorization);
  }
  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@Request() req) {
    return req.user;
  }
}
