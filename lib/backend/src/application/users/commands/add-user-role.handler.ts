import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { GetOneRoleQuery } from '@domains/role';
import { AddUserRoleCommand, GetOneUserQuery, UserEntity } from '@domains/user';
import { BackendException } from '@shared/exceptions';
import { UserRepository } from '../repositories';

@CommandHandler(AddUserRoleCommand)
export class AddUserRoleHandler implements ICommandHandler<AddUserRoleCommand> {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly userRepo: UserRepository,
	) {}

	public async execute(command: AddUserRoleCommand): Promise<UserEntity> {
		const { id, roleId } = command;
		const user: UserEntity = await this.queryBus.execute(new GetOneUserQuery(id));
		await this.queryBus.execute(new GetOneRoleQuery(roleId));
		if (user.roles.some((role) => role.id === roleId))
			throw new BackendException(HttpStatus.BAD_REQUEST, 'У пользователя уже есть эта роль');
		return this.userRepo.addRole(id, roleId);
	}
}
