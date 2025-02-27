import { PostEntity } from '@domains/post';
import { UserKey } from '@domains/user';
import { PrismaClient } from '@prisma/client';
import { SortDirection } from '@shared/enums';
import { ICrudRepository } from '@shared/interfaces';

export class PostRepository extends PrismaClient implements ICrudRepository<PostEntity> {
	public async create(title: string, content: string, authorId: number): Promise<PostEntity> {
		return this.post.create({
			data: {
				title,
				content,
				authorId,
			},
			select: {
				id: true,
				title: true,
				content: true,
				user: {
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

	public async getAll(
		offset?: number,
		limit?: number,
		order?: UserKey,
		direction?: SortDirection,
		search?: string,
	): Promise<PostEntity[]> {
		return this.post.findMany({
			skip: offset || undefined,
			take: limit || undefined,
			orderBy: { [order || 'createdAt']: direction || 'asc' },
			where: {
				OR: [
					{
						title: search,
					},
					{
						content: search,
					},
				],
			},
			select: {
				id: true,
				title: true,
				content: true,
				user: {
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

	public async getOneById(id: number): Promise<PostEntity | null> {
		return this.post.findUnique({
			where: { id },
			select: {
				id: true,
				title: true,
				content: true,
				user: {
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

	public async update(id: number, title: string, content: string): Promise<PostEntity> {
		return this.post.update({
			where: { id },
			data: {
				title,
				content,
			},
			select: {
				id: true,
				title: true,
				content: true,
				user: {
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

	public async delete(id: number): Promise<PostEntity> {
		return this.post.delete({
			where: { id },
			select: {
				id: true,
				title: true,
				content: true,
				user: {
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
