import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Sequelize } from 'sequelize-typescript';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { STATUS_CODES } from 'http';
import { Auth } from './entities/auth.entity';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Auth) private authRepository: typeof Auth,
    private readonly usersService: UsersService,
  ) { }

  async create(createAuthDto: CreateAuthDto) {
    const user_id = createAuthDto.user_id;
    const foundUser = await this.userRepository.findOne({ where: { user_id } });

    if (!foundUser) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Пользователь не найден!'
        }
      );
    }

    return await this.authRepository.create(createAuthDto);
  }

  // findAll() {
  //     return `This action returns all auth`;
  //   }

  // findOne(id: number) {
  //     return `This action returns a #${id} auth`;
  //   }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //     return `This action updates a #${id} auth`;
  //   }

  // remove(id: number) {
  //     return `This action removes a #${id} auth`;
  //   }

  async login(auth: AuthDto, values: { userAgent: string; ipAddress: string },) {
    const user = await this.usersService.findByLogin(auth.login);

    if (await bcrypt.compare(auth.password, user.password)) {
      return this.newRefreshAndAccessToken(user, values);
    } else {
      return Promise.reject(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Данные не совпадают!'
        }
      )
    }
  }

  private async newRefreshAndAccessToken(
    user: User,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const authObject = new CreateAuthDto();
    authObject.user_id = user.user_id;
    authObject.user_agent = values.userAgent;
    authObject.ip_address = values.ipAddress;

    const auth = (await this.create(authObject));

    return {
      refreshToken: auth.sign(),
      accessToken: sign(
        {
          user_id: user.user_id,
          login: user.login,
        },
        process.env.ACCESS_SECRET,
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
          message: 'Неправильный токен!'
        }
      )
    }

    const user = await this.usersService.findById(refreshToken.user_id);
    if (!user) {
      return Promise.reject(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Пользователь не найден!'
        }
      )
    }

    const accessToken = {
      user_id: user.user_id,
      login: user.login,
    };

    return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  }

  private retrieveRefreshToken(
    refreshStr: string,
  ): Promise<Auth | undefined> {
    try {
      const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
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
          message: 'Токен не найден!'
        }
      )
    }

    await this.authRepository.destroy({ where: { auth_id } });
  }
}
