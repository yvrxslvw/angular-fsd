import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { RefreshCommand } from '@domains/auth';
import { GetOneUserQuery, UserEntity } from '@domains/user';
import { BackendException } from '@shared/exceptions';
import { IRefreshTokenPayload } from '@shared/interfaces';
import { setTokens } from '@shared/utils';

@CommandHandler(RefreshCommand)
export class RefreshHandler implements ICommandHandler<RefreshCommand> {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly jwtService: JwtService,
	) {}

	public async execute(command: RefreshCommand) {
		const { refreshToken, response } = command;
		if (!refreshToken) throw new BackendException(HttpStatus.FORBIDDEN, 'Недостаточно прав');
		try {
			const payload: IRefreshTokenPayload = await this.jwtService.verifyAsync(refreshToken);
			const user: UserEntity = await this.queryBus.execute(new GetOneUserQuery(payload.id));
			await setTokens(user, response, this.jwtService);
			return response.status(HttpStatus.OK).json(user);
		} catch {
			throw new BackendException(HttpStatus.FORBIDDEN, 'Недостаточно прав');
		}
	}
}
