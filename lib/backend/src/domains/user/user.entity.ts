import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from '@shared/swagger';

export class UserEntity {
	@ApiProperty({ description: 'Идентификатор пользователя', example: SwaggerExample.MapperUser.id })
	declare id: number;

	@ApiProperty({ description: 'Логин пользователя', example: SwaggerExample.MapperUser.login })
	declare login: string;

	@ApiProperty({
		description: 'Посты пользователя',
		example: SwaggerExample.MapperUser.posts,
	})
	declare posts: {
		id: number;
		title: string;
		content: string;
		createdAt: Date;
		updatedAt: Date;
	}[];

	@ApiProperty({ description: 'Когда создан', example: SwaggerExample.MapperUser.createdAt })
	declare createdAt: Date;

	@ApiProperty({ description: 'Когда обновлён', example: SwaggerExample.MapperUser.updatedAt })
	declare updatedAt: Date;
}

export enum UserKey {
	id = 'id',
	login = 'login',
	posts = 'posts',
	createdAt = 'createdAt',
	updatedAt = 'updatedAt',
}
