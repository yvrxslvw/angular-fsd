import { PrismaClient } from '@prisma/client';
import { RoleEntity, RoleKey } from '@domains/role';
import { SortDirection } from '@shared/enums';
import { ICrudRepository } from '@shared/interfaces';

export class RoleRepository extends PrismaClient implements ICrudRepository<RoleEntity> {
	public async create(tag: string, name: string): Promise<RoleEntity> {
		return this.role.create({
			data: {
				tag,
				name,
			},
			select: {
				id: true,
				tag: true,
				name: true,
				users: {
					select: {
						id: true,
						login: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				updatedAt: true,
				createdAt: true,
			},
		});
	}

	public async getAll(
		search?: string,
		offset?: number,
		limit?: number,
		order?: RoleKey,
		direction?: SortDirection,
	): Promise<RoleEntity[]> {
		return this.role.findMany({
			skip: offset || undefined,
			take: limit || undefined,
			orderBy: { [order || 'createdAt']: direction || 'asc' },
			where: {
				OR: [
					{
						tag: {
							contains: search || '',
							mode: 'insensitive',
						},
					},
					{
						name: {
							contains: search || '',
							mode: 'insensitive',
						},
					},
				],
			},
			select: {
				id: true,
				tag: true,
				name: true,
				users: {
					select: {
						id: true,
						login: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	public async getOneById(id: number): Promise<RoleEntity | null> {
		return this.role.findUnique({
			where: { id },
			select: {
				id: true,
				tag: true,
				name: true,
				users: {
					select: {
						id: true,
						login: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	public async getOneByTag(tag: string): Promise<RoleEntity | null> {
		return this.role.findUnique({
			where: { tag },
			select: {
				id: true,
				tag: true,
				name: true,
				users: {
					select: {
						id: true,
						login: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	public async update(id: number, tag?: string, name?: string): Promise<RoleEntity> {
		return this.role.update({
			where: { id },
			data: {
				tag,
				name,
			},
			select: {
				id: true,
				tag: true,
				name: true,
				users: {
					select: {
						id: true,
						login: true,
						createdAt: true,
						updatedAt: true,
					},
				},
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	public async delete(id: number): Promise<RoleEntity> {
		return this.role.delete({
			where: { id },
			select: {
				id: true,
				tag: true,
				name: true,
				users: {
					select: {
						id: true,
						login: true,
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
