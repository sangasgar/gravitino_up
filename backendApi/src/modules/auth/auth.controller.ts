import { Controller, Post, Body, Ip, Req, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UsersService } from '../users/users.service';
import { AppError } from 'src/common/constants/error';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post()
  async login(@Body() authDto: AuthDto, @Ip() ipAddress, @Req() request) {
    const userExists = await this.usersService.findUser({ login: authDto.login });
    if (!userExists) {
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

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
