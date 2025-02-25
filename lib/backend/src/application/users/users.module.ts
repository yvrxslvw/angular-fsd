import { CommandHandlers } from '@application/users/commands';
import { QueryHandlers } from '@application/users/queries';
import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';

@Module({
	providers: [
		UserRepository,
		...QueryHandlers,
		...CommandHandlers,
	],
})
export class UsersModule {
}
