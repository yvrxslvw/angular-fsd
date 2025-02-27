import { PrismaClient } from '@prisma/client';
import { UserEntity, UserKey } from '@domains/user';
import { SortDirection } from '@shared/enums';
import { ICrudRepository } from '@shared/interfaces';

export class UserRepository extends PrismaClient implements ICrudRepository<UserEntity> {
	public async getAll(offset?: number, limit?: number, order?: UserKey, direction?: SortDirection, search?: string) {
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

	public async getOneById(id: number) {
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

	public async getOneByLogin(login: string) {
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

	public async create(login: string, password: string) {
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

	public async update(id: number, login?: string, password?: string) {
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

	public async delete(id: number) {
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
