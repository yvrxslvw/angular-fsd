import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { SwaggerExample } from '@shared/swagger';

export class LoginDto {
	@ApiProperty({ description: 'Логин пользователя', type: 'string', example: SwaggerExample.User.login })
	@IsString({ message: 'Поле login должно быть строкой' })
	@IsNotEmpty({ message: 'Поле login не должно быть пустым' })
	declare login: string;

	@ApiProperty({ description: 'Пароль пользователя', type: 'string', example: SwaggerExample.User.password })
	@IsString({ message: 'Поле password должно быть строкой' })
	@IsNotEmpty({ message: 'Поле password не должно быть пустым' })
	declare password: string;

	@ApiProperty({ description: 'Запомнить авторизацию', type: 'boolean', example: true })
	@IsBoolean({ message: 'Поле rememberMe должно быть boolean' })
	declare rememberMe: boolean;
}
