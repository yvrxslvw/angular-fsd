import { UserRepository } from '@application/users';
import { Module } from '@nestjs/common';
import { commandHandlers } from './commands';

@Module({
	providers: [...commandHandlers, UserRepository],
})
export class AuthModule {}
