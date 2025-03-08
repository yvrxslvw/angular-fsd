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
				roles: {
					connect: {
						id: 1,
					},
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
				roles: {
					select: {
						id: true,
						tag: true,
						name: true,
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
			orderBy: {
				[order || 'createdAt']: direction || 'asc',
			},
			where: {
				login: {
					contains: search || '',
					mode: 'insensitive',
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
				roles: {
					select: {
						id: true,
						tag: true,
						name: true,
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
				roles: {
					select: {
						id: true,
						tag: true,
						name: true,
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
				password: true,
				posts: {
					select: {
						id: true,
						title: true,
						content: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				roles: {
					select: {
						id: true,
						tag: true,
						name: true,
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
				roles: {
					select: {
						id: true,
						tag: true,
						name: true,
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
				roles: {
					select: {
						id: true,
						tag: true,
						name: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	public async addRole(userId: number, roleId: number): Promise<UserEntity> {
		return this.user.update({
			where: { id: userId },
			data: {
				roles: {
					connect: {
						id: roleId,
					},
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
				roles: {
					select: {
						id: true,
						tag: true,
						name: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	public async removeRole(userId: number, roleId: number): Promise<UserEntity> {
		return this.user.update({
			where: { id: userId },
			data: {
				roles: {
					disconnect: {
						id: roleId,
					},
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
				roles: {
					select: {
						id: true,
						tag: true,
						name: true,
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
