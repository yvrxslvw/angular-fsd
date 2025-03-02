import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { SwaggerExample } from '@shared/swagger';

export class CreatePostDto {
	@ApiProperty({ description: 'Заголовок поста', example: SwaggerExample.Post.title })
	@IsString({ message: 'Поле title должно быть строкой' })
	@Length(3, 128, { message: 'Поле title должно быть от 3 до 128 символов' })
	declare title: string;

	@ApiProperty({ description: 'Контент поста', example: SwaggerExample.Post.content })
	@IsString({ message: 'Поле content должно быть строкой' })
	@Length(3, 1024, { message: 'Поле content должно быть от 3 до 1024 символов' })
	declare content: string;
}
