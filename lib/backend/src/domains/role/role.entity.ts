import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from '@shared/swagger';

export class RoleEntity {
	@ApiProperty({ description: 'Идентификатор роли', example: SwaggerExample.MappedRole.id })
	declare id: number;

	@ApiProperty({ description: 'Тег роли', example: SwaggerExample.MappedRole.tag })
	declare tag: string;

	@ApiProperty({ description: 'Наименование роли', example: SwaggerExample.MappedRole.name })
	declare name: string;

	@ApiProperty({ description: 'Пользователи, имеющие эту роль', example: SwaggerExample.MappedRole.users })
	declare users: {
		id: number;
		login: string;
		createdAt: Date;
		updatedAt: Date;
	}[];

	@ApiProperty({ description: 'Когда создана', example: SwaggerExample.MappedRole.createdAt })
	declare createdAt: Date;

	@ApiProperty({ description: 'Когда обновлена', example: SwaggerExample.MappedRole.updatedAt })
	declare updatedAt: Date;
}

export enum RoleKey {
	id = 'id',
	tag = 'tag',
	name = 'name',
	createdAt = 'createdAt',
	updatedAt = 'updatedAt',
}
