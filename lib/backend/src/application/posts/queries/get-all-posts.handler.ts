import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { PostRepository } from '@application/posts/repositories';
import { GetAllPostsQuery, PostEntity } from '@domains/post';

@QueryHandler(GetAllPostsQuery)
export class GetAllPostsHandler implements ICommandHandler<GetAllPostsQuery> {
	constructor(private readonly postRepo: PostRepository) {}

	public async execute(query: GetAllPostsQuery): Promise<PostEntity[]> {
		const { search, offset, limit, order, direction } = query;
		return this.postRepo.getAll(offset, limit, order, direction, search);
	}
}
