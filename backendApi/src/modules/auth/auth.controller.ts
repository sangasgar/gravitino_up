import { Controller, Post, Body, Ip, Req, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UsersService } from '../users/users.service';
import { AppError } from 'src/common/constants/error';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/auth.guard';

@ApiTags('Auth')
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refresh_token);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refresh_token);
  }
}
