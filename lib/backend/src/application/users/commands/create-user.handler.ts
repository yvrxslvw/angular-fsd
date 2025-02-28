import { CreateUserCommand, UserEntity } from '@domains/user';
import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackendException } from '@shared/exceptions';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
	constructor(private readonly userRepo: UserRepository) {}

	public async execute(command: CreateUserCommand): Promise<UserEntity> {
		const { login, password } = command;
		const candidate = await this.userRepo.getOneByLogin(login);
		if (candidate) throw new BackendException(HttpStatus.BAD_REQUEST, `Пользователь с логином ${login} уже существует`);
		const hash = await bcrypt.hash(password, 10);
		return this.userRepo.create(login, hash);
	}
}
