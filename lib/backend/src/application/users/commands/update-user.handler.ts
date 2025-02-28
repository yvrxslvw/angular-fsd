import { UpdateUserCommand, UserEntity } from '@domains/user';
import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackendException } from '@shared/exceptions';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
	constructor(private readonly userRepo: UserRepository) {}

	public async execute(command: UpdateUserCommand): Promise<UserEntity> {
		const { id, login } = command;
		let password = command.password;
		const user = await this.userRepo.getOneById(id);
		if (!user) throw new BackendException(HttpStatus.NOT_FOUND, `Пользователь с ID ${id} не найден`);
		if (login) {
			const candidate = await this.userRepo.getOneByLogin(login);
			if (candidate && candidate.login !== user.login)
				throw new BackendException(HttpStatus.BAD_REQUEST, `Пользователь с логином ${login} уже существует`);
		}
		if (password) password = await bcrypt.hash(password, 10);
		return this.userRepo.update(id, login, password);
	}
}
