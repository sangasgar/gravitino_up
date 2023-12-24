import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';
import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AppError } from 'src/common/constants/error';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth) private authRepository: typeof Auth,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) { }

  async create(createAuthDto: CreateAuthDto) {
    try {
      const newAuth = await this.authRepository.create(createAuthDto);

      return newAuth;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(auth: AuthDto, values: { userAgent: string; ipAddress: string },) {
    const loginData = await this.usersService.findByLogin(auth.login);

    if (await bcrypt.compare(auth.password, loginData.password)) {
      delete loginData['password'];
      return this.newRefreshAndAccessToken(loginData, values);
    } else {
      throw new HttpException(AppError.WRONG_CREDENTIALS, HttpStatus.FORBIDDEN);
    }
  }

  private async newRefreshAndAccessToken(
    loginData: any,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const authObject = new CreateAuthDto();
    authObject.user_id = loginData.user_id;
    authObject.user_agent = values.userAgent;
    authObject.ip_address = values.ipAddress;

    const auth = (await this.create(authObject));

    return {
      refreshToken: auth.sign(),
      accessToken: sign(
        {
          ...loginData,
        },
        this.configService.get('access_secret'),
        {
          expiresIn: '1h',
        },
      ),
    };
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      throw new HttpException(AppError.INVALID_JWT, HttpStatus.FORBIDDEN);
    }

    const user = await this.usersService.findById(refreshToken.user_id);

    if (!user) {
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const loginData = await this.usersService.findByLogin(user.login);
    delete loginData['password'];

    const accessToken = {
      ...loginData,
    };

    return sign(accessToken, this.configService.get('access_secret'), { expiresIn: '1h' });
  }

  private async retrieveRefreshToken(
    refreshStr: string,
  ): Promise<Auth | undefined> {
    try {
      const decoded = verify(refreshStr, this.configService.get('refresh_token'));
      if (typeof decoded === 'string') {
        return undefined;
      }

      const auth_id = decoded.dataValues.auth_id;
      return await this.authRepository.findOne({ where: { auth_id } });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async logout(refreshStr): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);

    if (!refreshToken) {
      return;
    }

    const auth_id = refreshToken.auth_id;

    const foundAuth = await this.authRepository.findOne({ where: { auth_id } });
    if (!foundAuth) {
      throw new HttpException(AppError.INVALID_JWT, HttpStatus.FORBIDDEN);
    }

    await this.authRepository.destroy({ where: { auth_id } });
  }
}
