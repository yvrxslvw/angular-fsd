import { PrismaClient } from '@prisma/client';
import { PostEntity, PostKey } from '@domains/post';
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
		order?: PostKey,
		direction?: SortDirection,
		search?: string,
		authorId?: number,
	): Promise<PostEntity[]> {
		return this.post.findMany({
			skip: offset || undefined,
			take: limit || undefined,
			orderBy:
				order === 'user'
					? {
							id: direction || 'asc',
						}
					: {
							[order || 'createdAt']: direction || 'asc',
						},
			where: {
				AND: [
					{
						OR: [
							{
								title: {
									contains: search || '',
									mode: 'insensitive',
								},
							},
							{
								content: {
									contains: search || '',
									mode: 'insensitive',
								},
							},
						],
					},
					{
						authorId: authorId || undefined,
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

	public async update(id: number, title?: string, content?: string): Promise<PostEntity> {
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
