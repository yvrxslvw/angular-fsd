import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '@application/posts/repositories';
import { PostEntity, UpdatePostCommand } from '@domains/post';
import { BackendException } from '@shared/exceptions';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
	constructor(private readonly postRepo: PostRepository) {}

	public async execute(command: UpdatePostCommand): Promise<PostEntity> {
		const { id, title, content } = command;
		const candidate = await this.postRepo.getOneById(id);
		if (!candidate) throw new BackendException(HttpStatus.NOT_FOUND, `Пост с ID ${id} не найден`);
		return this.postRepo.update(id, title, content);
	}
}
