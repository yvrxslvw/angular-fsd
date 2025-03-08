import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { GetOneUserQuery, RemoveUserRoleCommand, UserEntity } from '@domains/user';
import { BackendException } from '@shared/exceptions';
import { UserRepository } from '../repositories';

@CommandHandler(RemoveUserRoleCommand)
export class RemoveUserRoleHandler implements ICommandHandler<RemoveUserRoleCommand> {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly userRepo: UserRepository,
	) {}

	public async execute(command: RemoveUserRoleCommand): Promise<UserEntity> {
		const { id, roleId } = command;
		const user: UserEntity = await this.queryBus.execute(new GetOneUserQuery(id));
		if (!user.roles.some((role) => role.id === roleId))
			throw new BackendException(HttpStatus.BAD_REQUEST, 'У пользователя нет данной роли');
		return this.userRepo.removeRole(id, roleId);
	}
}
