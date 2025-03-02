import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { PostsModule } from './posts';
import { UsersModule } from './users';

@Module({
	imports: [AuthModule, UsersModule, PostsModule],
})
export class ApplicationModule {}
