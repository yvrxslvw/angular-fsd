import { PrismaClient } from '@prisma/client';
import { UserEntity, UserKey } from '@domains/user';
import { SortDirection } from '@shared/enums';
import { ICrudRepository } from '@shared/interfaces';

export class UserRepository extends PrismaClient implements ICrudRepository<UserEntity> {
	public async create(login: string, password: string): Promise<UserEntity> {
		return this.user.create({
			data: {
				login,
				password,
			},
			select: {
				id: true,
				login: true,
				posts: {
					select: {
						id: true,
						title: true,
						content: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	public async getAll(
		offset?: number,
		limit?: number,
		order?: UserKey,
		direction?: SortDirection,
		search?: string,
	): Promise<UserEntity[]> {
		return this.user.findMany({
			skip: offset || undefined,
			take: limit || undefined,
			orderBy: { [order || 'createdAt']: direction || 'asc' },
			where: {
				login: {
					contains: search,
				},
			},
			select: {
				id: true,
				login: true,
				posts: {
					select: {
						id: true,
						title: true,
						content: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	public async getOneById(id: number): Promise<UserEntity | null> {
		return this.user.findUnique({
			where: { id },
			select: {
				id: true,
				login: true,
				posts: {
					select: {
						id: true,
						title: true,
						content: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	public async getOneByLogin(login: string): Promise<UserEntity | null> {
		return this.user.findUnique({
			where: { login },
			select: {
				id: true,
				login: true,
				posts: {
					select: {
						id: true,
						title: true,
						content: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	public async update(id: number, login?: string, password?: string): Promise<UserEntity> {
		return this.user.update({
			where: { id },
			data: {
				login,
				password,
			},
			select: {
				id: true,
				login: true,
				posts: {
					select: {
						id: true,
						title: true,
						content: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	public async delete(id: number): Promise<UserEntity> {
		return this.user.delete({
			where: { id },
			select: {
				id: true,
				login: true,
				posts: {
					select: {
						id: true,
						title: true,
						content: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
		});
	}
}
