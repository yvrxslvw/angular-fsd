import { GetProfileQuery } from '@domains/account';
import { UserEntity } from '@domains/user';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@shared/guards';

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
	public async getProfile() {
		return this.queryBus.execute(new GetProfileQuery());
	}
}
