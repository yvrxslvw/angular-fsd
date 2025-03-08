import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RoleRepository } from '@application/roles/repositories';
import { RoleEntity, UpdateRoleCommand } from '@domains/role';
import { BackendException } from '@shared/exceptions';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
	constructor(private readonly roleRepo: RoleRepository) {}

	public async execute(command: UpdateRoleCommand): Promise<RoleEntity> {
		const { id, tag, name } = command;
		const role = await this.roleRepo.getOneById(id);
		if (!role) throw new BackendException(HttpStatus.NOT_FOUND, `Роли с ID ${id} не существует`);
		if (tag) {
			const candidate = await this.roleRepo.getOneByTag(tag);
			if (candidate) throw new BackendException(HttpStatus.BAD_REQUEST, `Роль с тегом ${tag} уже существует`);
		}
		return this.roleRepo.update(id, tag, name);
	}
}
