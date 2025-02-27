import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
	@ApiProperty({ description: 'Идентификатор пользователя', example: 1 })
	declare id: number;

	@ApiProperty({ description: 'Логин пользователя', example: 'yvrxslvw' })
	declare login: string;

	@ApiProperty({
		description: 'Посты пользователя',
		example: [
			{
				id: 1,
				title: 'Aggredior voluptas vicinus comprehendo.',
				content: 'Sophismata vulariter damnatio id. Delicate tres cogito armarium artificiose vulgo.',
				createdAt: '2025-02-27T20:22:16.777Z',
				updatedAt: '2025-02-27T20:22:16.777Z',
			},
		],
	})
	declare posts: {
		id: number;
		title: string;
		content: string;
		createdAt: Date;
		updatedAt: Date;
	}[];

	@ApiProperty({ description: 'Когда создан', example: new Date() })
	declare createdAt: Date;

	@ApiProperty({ description: 'Когда обновлён', example: new Date() })
	declare updatedAt: Date;
}

export enum UserKey {
	id = 'id',
	login = 'login',
	createdAt = 'createdAt',
	updatedAt = 'updatedAt',
}
