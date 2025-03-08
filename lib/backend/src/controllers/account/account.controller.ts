import { GetProfileQuery } from '@domains/account';
import { UserEntity } from '@domains/user';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@shared/guards';
import { Request } from 'express';

@ApiTags('Аккаунт')
@Controller('account')
export class AccountController {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus,
	) {}

	@ApiOperation({ summary: 'Получение своего аккаунта' })
	@ApiResponse({ status: 200, description: 'Успешное получение', type: UserEntity })
	@ApiResponse({ status: 401, description: 'Не авторизован' })
	@ApiCookieAuth()
	@UseGuards(AuthGuard)
	@Get()
	public async getProfile(@Req() request: Request) {
		return this.queryBus.execute(new GetProfileQuery(request));
	}
}
