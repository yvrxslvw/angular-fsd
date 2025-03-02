import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from '@shared/swagger';

export class PostEntity {
	@ApiProperty({ description: 'Идентификатор поста', example: SwaggerExample.MappedPost.id })
	declare id: number;

	@ApiProperty({ description: 'Заголовок поста', example: SwaggerExample.MappedPost.title })
	declare title: string;

	@ApiProperty({ description: 'Контент поста', example: SwaggerExample.MappedPost.content })
	declare content: string;

	@ApiProperty({ description: 'Автор поста', example: SwaggerExample.MappedPost.user })
	declare user: {
		id: number;
		login: string;
		createdAt: Date;
		updatedAt: Date;
	};

	@ApiProperty({ description: 'Когда создан', example: SwaggerExample.MappedPost.createdAt })
	declare createdAt: Date;

	@ApiProperty({ description: 'Когда обновлён', example: SwaggerExample.MappedPost.updatedAt })
	declare updatedAt: Date;
}

export enum PostKey {
	id = 'id',
	title = 'title',
	content = 'content',
	createdAt = 'createdAt',
	updatedAt = 'updatedAt',
}
