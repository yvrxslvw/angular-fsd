import { HttpStatus } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleRepository } from '@application/roles/repositories';
import { GetOneRoleQuery, RoleEntity } from '@domains/role';
import { BackendException } from '@shared/exceptions';

@QueryHandler(GetOneRoleQuery)
export class GetOneRoleHandler implements IQueryHandler<GetOneRoleQuery> {
	constructor(private readonly roleRepo: RoleRepository) {}

	public async execute(query: GetOneRoleQuery): Promise<RoleEntity> {
		const { id } = query;
		const role = await this.roleRepo.getOneById(id);
		if (!role) throw new BackendException(HttpStatus.NOT_FOUND, `Роли с ID ${id} не существует`);
		return role;
	}
}
