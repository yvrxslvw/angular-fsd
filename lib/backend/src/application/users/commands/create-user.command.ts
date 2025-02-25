import { CreateUserCommand } from '@domains/user';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
	constructor(private readonly userRepo: UserRepository) {
	}

	public async execute(command: CreateUserCommand) {
		const { login, password } = command;
		const candidate = await this.userRepo.getOneByLogin(login);
		if (candidate) throw new BadRequestException(`Пользователь с логином ${login} уже существует`);
		const hash = await bcrypt.hash(password, 10);
		return this.userRepo.create(login, hash);
	}
}
