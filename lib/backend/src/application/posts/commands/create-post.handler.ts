import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '@application/posts/repositories';
import { CreatePostCommand, PostEntity } from '@domains/post';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
	constructor(private readonly postRepo: PostRepository) {}

	public async execute(command: CreatePostCommand): Promise<PostEntity> {
		const { title, content, authorId } = command;
		return this.postRepo.create(title, content, authorId);
	}
}
