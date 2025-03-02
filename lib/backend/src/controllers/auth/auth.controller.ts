import { Body, Controller, NotImplementedException, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '@domains/user';
import { AuthGuard } from '@shared/guards';
import { LoginDto, RegisterDto } from './dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
	constructor(commandBus: CommandBus) {}

	@ApiOperation({ summary: 'Авторизация' })
	@ApiResponse({ status: 201, description: 'Успешная авторизация', type: UserEntity })
	@ApiResponse({ status: 400, description: 'Ошибка валидации' })
	@ApiResponse({ status: 403, description: 'Неверный логин или пароль' })
	@Post('login')
	public async login(@Body() loginDto: LoginDto) {
		throw new NotImplementedException();
	}

	@ApiOperation({ summary: 'Регистрация' })
	@ApiResponse({ status: 201, description: 'Успешная регистрация', type: UserEntity })
	@ApiResponse({ status: 400, description: 'Ошибка валидации или пользователь уже существует' })
	@Post('register')
	public async register(@Body() registerDto: RegisterDto) {
		throw new NotImplementedException();
	}

	@ApiOperation({ summary: 'Обновление токенов' })
	@ApiResponse({ status: 201, description: 'Успешное обновление токенов', type: UserEntity })
	@ApiResponse({ status: 403, description: 'Нет токена обновления или токен обновления недействителен' })
	@Post('refresh')
	public async refresh() {
		throw new NotImplementedException();
	}

	@ApiOperation({ summary: 'Выход из аккаунта' })
	@ApiResponse({ status: 204, description: 'Успешный выход из аккаунта' })
	@ApiResponse({ status: 401, description: 'Недостаточно прав' })
	@ApiCookieAuth()
	@UseGuards(AuthGuard)
	@Post('logout')
	public async logout() {
		throw new NotImplementedException();
	}
}
