import { CreateRoleCommand, RoleEntity } from '@domains/role';
import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackendException } from '@shared/exceptions';
import { RoleRepository } from '../repositories';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
	constructor(private readonly roleRepo: RoleRepository) {}

	public async execute(command: CreateRoleCommand): Promise<RoleEntity> {
		const { tag, name } = command;
		const candidate = await this.roleRepo.getOneByTag(tag);
		if (candidate) throw new BackendException(HttpStatus.BAD_REQUEST, `Роль с тегом ${tag} уже существует`);
		return this.roleRepo.create(tag, name);
	}
}
