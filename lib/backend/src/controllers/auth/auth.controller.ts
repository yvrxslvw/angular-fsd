import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LoginCommand, LogoutCommand, RefreshCommand, RegisterCommand } from '@domains/auth';
import { UserEntity } from '@domains/user';
import { AuthGuard } from '@shared/guards';
import { extractTokens } from '@shared/utils';
import { LoginDto, RegisterDto } from './dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
	constructor(private readonly commandBus: CommandBus) {}

	@ApiOperation({ summary: 'Авторизация' })
	@ApiResponse({ status: 200, description: 'Успешная авторизация', type: UserEntity })
	@ApiResponse({ status: 400, description: 'Ошибка валидации' })
	@ApiResponse({ status: 403, description: 'Неверный логин или пароль' })
	@Post('login')
	public async login(@Res() response: Response, @Body() loginDto: LoginDto) {
		const { login, password, rememberMe } = loginDto;
		return this.commandBus.execute(new LoginCommand(login, password, rememberMe, response));
	}

	@ApiOperation({ summary: 'Регистрация' })
	@ApiResponse({ status: 201, description: 'Успешная регистрация', type: UserEntity })
	@ApiResponse({ status: 400, description: 'Ошибка валидации или пользователь уже существует' })
	@Post('register')
	public async register(@Res() response: Response, @Body() registerDto: RegisterDto) {
		const { login, password } = registerDto;
		return this.commandBus.execute(new RegisterCommand(login, password, response));
	}

	@ApiOperation({ summary: 'Обновление токенов' })
	@ApiResponse({ status: 200, description: 'Успешное обновление токенов', type: UserEntity })
	@ApiResponse({ status: 403, description: 'Нет токена обновления или токен обновления недействителен' })
	@Post('refresh')
	public async refresh(@Req() request: Request, @Res() response: Response) {
		const { refreshToken } = extractTokens(request);
		return this.commandBus.execute(new RefreshCommand(refreshToken, response));
	}

	@ApiOperation({ summary: 'Выход из аккаунта' })
	@ApiResponse({ status: 204, description: 'Успешный выход из аккаунта' })
	@ApiResponse({ status: 401, description: 'Недостаточно прав' })
	@ApiCookieAuth()
	@UseGuards(AuthGuard)
	@Post('logout')
	public async logout(@Res() response: Response) {
		return this.commandBus.execute(new LogoutCommand(response));
	}
}
