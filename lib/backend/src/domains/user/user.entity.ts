import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
	@ApiProperty({ description: 'Идентификатор пользователя', example: 1 })
	declare id: number;

	@ApiProperty({ description: 'Логин пользователя', example: 'yvrxslvw' })
	declare login: string;

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
