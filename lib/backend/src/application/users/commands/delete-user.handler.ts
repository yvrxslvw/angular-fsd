import { DeleteUserCommand, UserEntity } from '@domains/user';
import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackendException } from '@shared/exceptions';
import { UserRepository } from '../repositories';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
	constructor(private readonly userRepo: UserRepository) {}

	public async execute(command: DeleteUserCommand): Promise<UserEntity> {
		const { id } = command;
		const user = await this.userRepo.getOneById(id);
		if (!user) throw new BackendException(HttpStatus.NOT_FOUND, `Пользователь с ID ${id} не найден`);
		return this.userRepo.delete(id);
	}
}
