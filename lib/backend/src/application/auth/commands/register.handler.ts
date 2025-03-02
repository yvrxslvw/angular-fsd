import { HttpStatus } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { RegisterCommand } from '@domains/auth';
import { CreateUserCommand, UserEntity } from '@domains/user';
import { setTokens } from '@shared/utils';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly jwtService: JwtService,
	) {}

	public async execute(command: RegisterCommand) {
		const { login, password, response } = command;
		const user: UserEntity = await this.commandBus.execute(new CreateUserCommand(login, password));
		await setTokens(user, response, this.jwtService);
		return response.status(HttpStatus.CREATED).json(user);
	}
}
