import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand, UserEntity } from '@domains/user';
import { UserRepository } from '../repositories';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
	constructor(private readonly userRepo: UserRepository) {}

	public async execute(command: DeleteUserCommand): Promise<UserEntity> {
		const user = await this.userRepo.getOneById(command.id);
		if (!user) throw new NotFoundException(`Пользователь с ID: ${command.id} не найден`);
		return this.userRepo.delete(command.id);
	}
}
