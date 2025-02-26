import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from '@domains/user';
import { UserRepository } from '../repositories/user.repository';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
	constructor(private readonly userRepo: UserRepository) {}

	public async execute(query: GetAllUsersQuery) {
		const { offset, limit, order, direction, search } = query;
		return this.userRepo.getAll(offset, limit, order, direction, search);
	}
}
