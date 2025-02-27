import { Module } from '@nestjs/common';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';
import { PostRepository } from './repositories';

@Module({
	providers: [PostRepository, ...QueryHandlers, ...CommandHandlers],
})
export class PostsModule {}
