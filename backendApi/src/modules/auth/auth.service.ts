import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/entities/user.entity';
import { Sequelize } from 'sequelize-typescript';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { STATUS_CODES } from 'http';
import { Auth } from './entities/auth.entity';
import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AppError } from 'src/common/constants/error';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Auth) private authRepository: typeof Auth,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) { }

  async create(createAuthDto: CreateAuthDto) {
    const user_id = createAuthDto.user_id;
    const foundUser = await this.userRepository.findOne({ where: { user_id } });

    if (!foundUser) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: AppError.USER_NOT_FOUND
        }
      );
    }

    return await this.authRepository.create(createAuthDto);
  }

  async login(auth: AuthDto, values: { userAgent: string; ipAddress: string },) {
    const loginData = await this.usersService.findByLogin(auth.login);

    if (await bcrypt.compare(auth.password, loginData.password)) {
      delete loginData['password'];
      return this.newRefreshAndAccessToken(loginData, values);
    } else {
      return Promise.reject(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: AppError.WRONG_CREDENTIALS,
        }
      )
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
      return Promise.reject(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: AppError.INVALID_JWT,
        }
      )
    }

    const user = await this.usersService.findById(refreshToken.user_id);

    if (!user) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: AppError.USER_NOT_FOUND
        }
      )
    }

    const loginData = await this.usersService.findByLogin(user.login);

    const accessToken = {
      ...loginData,
    };

    return sign(accessToken, this.configService.get('access_secret'), { expiresIn: '1h' });
  }

  private retrieveRefreshToken(
    refreshStr: string,
  ): Promise<Auth | undefined> {
    try {
      const decoded = verify(refreshStr, this.configService.get('refresh_token'));
      if (typeof decoded === 'string') {
        return undefined;
      }

      const auth_id = decoded.dataValues.auth_id;
      return Promise.resolve(
        this.authRepository.findOne({ where: { auth_id } }),
      );
    } catch (e) {
      return Promise.reject(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e,
        }
      )
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
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: AppError.INVALID_JWT
        }
      )
    }

    await this.authRepository.destroy({ where: { auth_id } });
  }
}
