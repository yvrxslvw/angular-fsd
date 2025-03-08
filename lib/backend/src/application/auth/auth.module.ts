import { Module } from '@nestjs/common';
import { UserRepository } from '@application/users';
import { commandHandlers } from './commands';

@Module({
	providers: [...commandHandlers, UserRepository],
})
export class AuthModule {}
