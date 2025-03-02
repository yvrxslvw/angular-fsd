import { ApiProperty } from '@nestjs/swagger';
import { SwaggerExample } from '@shared/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
	@ApiProperty({ description: 'Логин пользователя', type: 'string', example: SwaggerExample.User.login })
	@IsString({ message: 'Логин должно быть строкой' })
	@IsNotEmpty({ message: 'Логин не должно быть пустым' })
	declare login: string;

	@ApiProperty({ description: 'Пароль пользователя', type: 'string', example: SwaggerExample.User.password })
	@IsString({ message: 'Пароль должно быть строкой' })
	@IsNotEmpty({ message: 'Пароль не должно быть пустым' })
	declare password: string;

	@ApiProperty({ description: 'Запомнить авторизацию', type: 'boolean', example: true })
	@IsBoolean({ message: "'Запомнить меня' должно быть булевым выражением" })
	declare rememberMe: boolean;
}
