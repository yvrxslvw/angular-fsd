import { HttpStatus } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostRepository } from '@application/posts/repositories';
import { GetOnePostQuery, PostEntity } from '@domains/post';
import { BackendException } from '@shared/exceptions';

@QueryHandler(GetOnePostQuery)
export class GetOnePostHandler implements IQueryHandler<GetOnePostQuery> {
	constructor(private readonly postRepo: PostRepository) {}

	public async execute(query: GetOnePostQuery): Promise<PostEntity> {
		const { id } = query;
		const post = await this.postRepo.getOneById(id);
		if (!post) throw new BackendException(HttpStatus.NOT_FOUND, `Пост с ID ${id} не найден`);
		return post;
	}
}
