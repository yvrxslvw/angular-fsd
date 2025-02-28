import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';
import { PasswordRegex } from '@shared/regex';
import { SwaggerExample } from '@shared/swagger';

export class CreateUserDto {
	@ApiProperty({ description: 'Логин пользователя', example: SwaggerExample.User.login })
	@IsString({ message: 'Логин должен быть строкой' })
	@Length(3, 24, { message: 'Длина логина должна быть от 3 до 24 символов' })
	declare login: string;

	@ApiProperty({ description: 'Пароль пользователя', example: SwaggerExample.User.password })
	@IsString({ message: 'Пароль должен быть строкой' })
	@Length(5, 64, { message: 'Длина пароля должна быть от 5 до 64 символов' })
	@Matches(PasswordRegex, { message: 'Пароль слишком простой' })
	declare password: string;
}
