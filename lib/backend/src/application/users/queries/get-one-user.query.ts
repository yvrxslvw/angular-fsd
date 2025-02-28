import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneUserQuery, UserEntity } from '@domains/user';
import { UserRepository } from '../repositories';

@QueryHandler(GetOneUserQuery)
export class GetOneUserHandler implements IQueryHandler<GetOneUserQuery> {
	constructor(private readonly userRepo: UserRepository) {}

	public async execute(query: GetOneUserQuery): Promise<UserEntity> {
		const { id } = query;
		const user = await this.userRepo.getOneById(id);
		if (!user) throw new NotFoundException(`Пользователь с ID: ${id} не найден`);
		return user;
	}
}
