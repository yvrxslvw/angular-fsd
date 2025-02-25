import { UserKey } from '@domains/user';
import { PrismaClient } from '@prisma/client';
import { SortDirection } from '@shared/enums';

export class UserRepository extends PrismaClient {
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
			omit: { password: true },
		});
	}

	public async getOneById(id: number) {
		return this.user.findUnique({ where: { id }, omit: { password: true } });
	}

	public async getOneByLogin(login: string) {
		return this.user.findUnique({ where: { login } });
	}

	public async create(login: string, password: string) {
		return this.user.create({
			data: {
				login,
				password,
			},
			omit: { password: true },
		});
	}

	public async update(id: number, login?: string, password?: string) {
		return this.user.update({
			where: { id },
			data: {
				login,
				password,
			},
			omit: { password: true },
		});
	}

	public async delete(id: number) {
		return this.user.delete({
			where: { id },
			omit: { password: true },
		});
	}
}
