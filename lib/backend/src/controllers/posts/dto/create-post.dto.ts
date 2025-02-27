import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreatePostDto {
	@ApiProperty({ description: 'Заголовок поста', example: 'Aggredior voluptas vicinus comprehendo.' })
	@IsString({ message: 'Заголовок должен быть строкой' })
	@Length(3, 128, { message: 'Длина заголовка должна быть от 3 до 128 символов' })
	declare title: string;

	@ApiProperty({
		description: 'Контент поста',
		example: 'Sophismata vulariter damnatio id. Delicate tres cogito armarium artificiose vulgo.',
	})
	@IsString({ message: 'Контент должен быть строкой' })
	@Length(0, 1024, { message: 'Длина контента должна быть до 1024 символов' })
	declare content: string;

	@ApiProperty({ description: 'Идентификатор автора поста', example: 1 })
	@IsNumber({}, { message: 'Идентификатор должен быть числом' })
	declare authorId: number;
}
