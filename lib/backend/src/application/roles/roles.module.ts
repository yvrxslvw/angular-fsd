import { Module } from '@nestjs/common';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';
import { RoleRepository } from './repositories';

@Module({
	providers: [RoleRepository, ...QueryHandlers, ...CommandHandlers],
})
export class RolesModule {}
