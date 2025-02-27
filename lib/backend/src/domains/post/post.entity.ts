import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@domains/user';

export class PostEntity {
	@ApiProperty({ description: 'Идентификатор поста', example: 1 })
	declare id: number;

	@ApiProperty({ description: 'Заголовок поста', example: 'Aggredior voluptas vicinus comprehendo.' })
	declare title: string;

	@ApiProperty({
		description: 'Контент поста',
		example: 'Sophismata vulariter damnatio id. Delicate tres cogito armarium artificiose vulgo.',
	})
	declare content: string;

	@ApiProperty({
		description: 'Автор поста',
		example: {
			id: 1,
			login: 'yvrxslvw',
			createdAt: '2025-02-27T19:56:38.632Z',
			updatedAt: '2025-02-27T19:56:38.632Z',
		},
	})
	declare author: UserEntity;

	@ApiProperty({ description: 'Когда создан', example: new Date() })
	declare createdAt: Date;

	@ApiProperty({ description: 'Когда обновлён', example: new Date() })
	declare updatedAt: Date;
}

export enum PostKey {
	id = 'id',
	title = 'title',
	content = 'content',
	author = 'author',
	createdAt = 'createdAt',
	updatedAt = 'updatedAt',
}
