import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '@application/posts/repositories';
import { DeletePostCommand, PostEntity } from '@domains/post';
import { BackendException } from '@shared/exceptions';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
	constructor(private readonly postRepo: PostRepository) {}

	public async execute(command: DeletePostCommand): Promise<PostEntity> {
		const { id, user } = command;
		const candidate = await this.postRepo.getOneById(id);
		if (!candidate) throw new BackendException(HttpStatus.NOT_FOUND, `Пост с ID ${id} не найден`);
		if (candidate.user.id !== user.id && !user.roles.includes('ADMIN'))
			throw new BackendException(HttpStatus.FORBIDDEN, 'Недостаточно прав');
		return this.postRepo.delete(id);
	}
}
