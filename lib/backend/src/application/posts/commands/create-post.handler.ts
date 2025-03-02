import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '@application/posts/repositories';
import { CreatePostCommand, PostEntity } from '@domains/post';
import { BackendException } from '@shared/exceptions';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
	constructor(private readonly postRepo: PostRepository) {}

	public async execute(command: CreatePostCommand): Promise<PostEntity> {
		const { title, content, user, authorId } = command;
		if (!user.roles.includes('ADMIN') && authorId) throw new BackendException(HttpStatus.FORBIDDEN, 'Недостаточно прав');
		return this.postRepo.create(title, content, authorId ? authorId : user.id);
	}
}
