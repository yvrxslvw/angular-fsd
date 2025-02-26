import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { UpdateUserCommand } from '@domains/user';
import { UserRepository } from '../repositories/user.repository';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
	constructor(private readonly userRepo: UserRepository) {}

	public async execute(command: UpdateUserCommand) {
		const { id, login } = command;
		let password = command.password;
		const user = await this.userRepo.getOneById(id);
		if (!user) throw new NotFoundException(`Пользователь с ID: ${id} не найден`);
		if (login) {
			const candidate = await this.userRepo.getOneByLogin(login);
			if (candidate && candidate.login !== user.login)
				throw new BadRequestException(`Пользователь с логином ${login} уже существует`);
		}
		if (password) password = await bcrypt.hash(password, 10);
		return this.userRepo.update(id, login, password);
	}
}
