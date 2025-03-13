import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';
import { LoginRegex, PasswordRegex } from '@shared/regex';
import { SwaggerExample } from '@shared/swagger';

export class CreateUserDto {
	@ApiProperty({ description: 'Логин пользователя', example: SwaggerExample.User.login })
	@IsString({ message: 'Поле login должно быть строкой' })
	@Length(3, 24, { message: 'Поле login должно быть от 3 до 24 символов' })
	@Matches(LoginRegex, { message: 'Поле login некорректное' })
	declare login: string;

	@ApiProperty({ description: 'Пароль пользователя', example: SwaggerExample.User.password })
	@IsString({ message: 'Поле password должно быть строкой' })
	@Length(5, 64, { message: 'Поле password должно быть от 5 до 64 символов' })
	@Matches(PasswordRegex, { message: 'Поле password слишком простое' })
	declare password: string;
}
