import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ description: 'Логин пользователя', example: 'yvrxslvw' })
	@IsString({ message: 'Логин должен быть строкой' })
	@Length(3, 24, { message: 'Длина логина должна быть от 3 до 24 символов' })
	declare login: string;

	@ApiProperty({ description: 'Пароль пользователя', example: 'Test1234$' })
	@IsString({ message: 'Пароль должен быть строкой' })
	@Length(5, 64, { message: 'Длина пароля должна быть от 5 до 64 символов' })
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+-=\\|\]\[{}'";:/?.>,<])[a-zA-Z0-9~!@#$%^&*()_+-=\\|\]\[{}'";:/?.>,<]{5,64}$/g, { message: 'Пароль слишком простой' })
	declare password: string;
}
