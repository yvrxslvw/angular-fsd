import { Module } from '@nestjs/common';
import { AccountModule } from './account';
import { AuthModule } from './auth';
import { PostsModule } from './posts';
import { RolesModule } from './roles';
import { UsersModule } from './users';

@Module({
	imports: [AuthModule, AccountModule, UsersModule, PostsModule, RolesModule],
})
export class ControllersModule {}
