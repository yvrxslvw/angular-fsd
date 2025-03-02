import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '@application/posts/repositories';
import { PostEntity, UpdatePostCommand } from '@domains/post';
import { BackendException } from '@shared/exceptions';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
	constructor(private readonly postRepo: PostRepository) {}

	public async execute(command: UpdatePostCommand): Promise<PostEntity> {
		const { id, user, title, content } = command;
		const candidate = await this.postRepo.getOneById(id);
		if (!candidate) throw new BackendException(HttpStatus.NOT_FOUND, `Пост с ID ${id} не найден`);
		if (candidate.user.id !== user.id && !user.roles.includes('ADMIN'))
			throw new BackendException(HttpStatus.FORBIDDEN, 'Недостаточно прав');
		return this.postRepo.update(id, title, content);
	}
}
