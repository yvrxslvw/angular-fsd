import { Module } from '@nestjs/common';
import { PostsModule } from './posts';
import { UsersModule } from './users';

@Module({
	imports: [UsersModule, PostsModule],
})
export class ApplicationModule {}
