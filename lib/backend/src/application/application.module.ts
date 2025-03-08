import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { PostsModule } from './posts';
import { RolesModule } from './roles';
import { UsersModule } from './users';

@Module({
	imports: [AuthModule, UsersModule, PostsModule, RolesModule],
})
export class ApplicationModule {}
