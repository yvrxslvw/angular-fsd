import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';
import { SwaggerExample } from '@shared/swagger';

export class CreatePostDto {
	@ApiProperty({ description: 'Заголовок поста', example: SwaggerExample.Post.title })
	@IsString({ message: 'Заголовок должен быть строкой' })
	@Length(3, 128, { message: 'Длина заголовка должна быть от 3 до 128 символов' })
	declare title: string;

	@ApiProperty({ description: 'Контент поста', example: SwaggerExample.Post.content })
	@IsString({ message: 'Контент должен быть строкой' })
	@Length(3, 1024, { message: 'Длина контента должна быть от 3 до 1024 символов' })
	declare content: string;

	@ApiProperty({ description: 'Идентификатор автора поста', example: SwaggerExample.Post.authorId })
	@IsNumber({}, { message: 'Идентификатор должен быть числом' })
	declare authorId: number;
}
