import { Module } from '@nestjs/common';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';

@Module({
	providers: [...CommandHandlers, ...QueryHandlers],
})
export class AccountModule {}
