import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RoleRepository } from '@application/roles/repositories';
import { DeleteRoleCommand, RoleEntity } from '@domains/role';
import { BackendException } from '@shared/exceptions';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
	constructor(private readonly roleRepo: RoleRepository) {}

	public async execute(command: DeleteRoleCommand): Promise<RoleEntity> {
		const { id } = command;
		const role = await this.roleRepo.getOneById(id);
		if (!role) throw new BackendException(HttpStatus.NOT_FOUND, `Роли с ID ${id} не существует`);
		return this.roleRepo.delete(id);
	}
}
