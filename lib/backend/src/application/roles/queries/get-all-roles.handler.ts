import { RoleRepository } from '@application/roles/repositories';
import { GetAllRolesQuery, RoleEntity } from '@domains/role';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllRolesQuery)
export class GetAllRolesHandler implements IQueryHandler<GetAllRolesQuery> {
	constructor(private readonly roleRepo: RoleRepository) {}

	public async execute(query: GetAllRolesQuery): Promise<RoleEntity[]> {
		const { search, offset, limit, order, direction } = query;
		return this.roleRepo.getAll(search, offset, limit, order, direction);
	}
}
