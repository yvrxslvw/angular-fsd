import { Module } from '@nestjs/common';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';
import { UserRepository } from './repositories';

@Module({
	providers: [
		UserRepository,
		...QueryHandlers,
		...CommandHandlers,
	],
})
export class UsersModule {
}
