import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@application/users';
import { LoginCommand } from '@domains/auth';
import { UserEntity } from '@domains/user';
import { BackendException } from '@shared/exceptions';
import { setTokens } from '@shared/utils';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
	constructor(
		private readonly userRepo: UserRepository,
		private readonly jwtService: JwtService,
	) {}

	public async execute(command: LoginCommand) {
		const { login, password, rememberMe, response } = command;
		const user: (UserEntity & { password?: string }) | null = await this.userRepo.getOneByLogin(login);
		if (!user) throw new BackendException(HttpStatus.FORBIDDEN, 'Неверный логин или пароль');
		if (!(await bcrypt.compare(password, user.password!)))
			throw new BackendException(HttpStatus.FORBIDDEN, 'Неверный логин или пароль');
		delete user.password;
		await setTokens(user, response, this.jwtService, rememberMe);
		return response.status(HttpStatus.OK).json(user);
	}
}
