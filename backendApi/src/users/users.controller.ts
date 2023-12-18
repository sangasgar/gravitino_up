import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 201, description: 'Пользователь успешно создан!' })
    @ApiResponse({ status: 404, description: 'Запись отсутствует в базе данных!' })
    @ApiResponse({ status: 409, description: 'Пользователь с таким логином уже существует!' })
    @ApiResponse({ status: 403, description: 'Forbidden!' })
    create(@Body() user: CreateUserDto) {
        return this.usersService.create(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({
        status: 200,
        description: 'Список всех пользователей',
        type: User,
    })
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Получение отдельного пользователя' })
    @ApiResponse({
        status: 200,
        description: 'Найденная запись',
        type: User,
    })
    @ApiResponse({
        status: 404,
        description: 'Пользователь не найден!',
        type: User,
    })
    findById(@Param('id') id: number) {
        return this.usersService.findById(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    @ApiOperation({ summary: 'Обновление данных пользователя' })
    @ApiResponse({ status: 200, description: 'Пользователь успешно обновлен!' })
    @ApiResponse({ status: 404, description: 'Запись отсутствует в базе данных!' })
    @ApiResponse({ status: 409, description: 'Пользователь с таким логином уже существует!' })
    @ApiResponse({ status: 403, description: 'Forbidden!' })
    update(@Body() user: UpdateUserDto) {
        return this.usersService.update(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Удаление отдельного пользователя' })
    @ApiResponse({
        status: 200,
        description: 'Пользователь успешно удален!',
        type: User,
    })
    @ApiResponse({
        status: 404,
        description: 'Пользователь не найден!',
        type: User,
    })
    remove(@Param('id') id: number) {
        return this.usersService.remove(+id);
    }

    // @Get()
    // @ApiResponse({
    //     status: 200,
    //     description: 'Успешный вход в аккаунт!',
    //     type: User,
    // })
    // @ApiResponse({
    //     status: 404,
    //     description: 'Пользователь не найден!',
    //     type: User,
    // })
    // logIn(@Query('login') login: string, @Query('password') password: string) {
    //     return this.usersService.logIn(login, password);
    // }
}