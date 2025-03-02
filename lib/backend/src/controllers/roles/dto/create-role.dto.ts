import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { SwaggerExample } from '@shared/swagger';

export class CreateRoleDto {
	@ApiProperty({ description: 'Тег роли', example: SwaggerExample.Role.tag })
	@IsString({ message: 'Поле tag должно быть строкой' })
	@Length(3, 24, { message: 'Поле tag должно быть длиной от 3 до 24 символов' })
	declare tag: string;

	@ApiProperty({ description: 'Наименование роли', example: SwaggerExample.Role.name })
	@IsString({ message: 'Поле name должно быть строкой' })
	@Length(3, 32, { message: 'Поле name должно быть длиной от 3 до 32 символов' })
	declare name: string;
}
