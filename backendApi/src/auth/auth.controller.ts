import { Controller, Post, Body, Ip, Req, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  login(@Body() authDto: AuthDto, @Ip() ipAddress, @Req() request) {
    return this.authService.login(authDto, { userAgent: request.headers['user-agent'], ipAddress: ipAddress });
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refresh_token);
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refresh_token);
  }
}
