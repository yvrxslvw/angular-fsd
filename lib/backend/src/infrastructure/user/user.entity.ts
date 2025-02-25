import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
	@ApiProperty({ description: 'Идентификатор пользователя', example: 1 })
	declare id: number;

	@ApiProperty({ description: 'Логин пользователя', example: 'yvrxslvw' })
	declare login: string;

	@ApiProperty({ description: 'Когда создан', example: new Date() })
	declare createdAt: string;

	@ApiProperty({ description: 'Когда обновлён', example: new Date() })
	declare updatedAt: string;

	@ApiProperty({ description: 'Когда удалён', example: null })
	declare deletedAt: string;
}

export enum UserKey {
	id = 'id',
	login = 'login',
	createdAt = 'createdAt',
	updatedAt = 'updatedAt',
	deletedAt = 'deletedAt',
}
