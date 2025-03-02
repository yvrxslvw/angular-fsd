import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCookieAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
	CreatePostCommand,
	DeletePostCommand,
	GetAllPostsQuery,
	GetOnePostQuery,
	PostEntity,
	PostKey,
	UpdatePostCommand,
} from '@domains/post';
import { SortDirection } from '@shared/enums';
import { AuthGuard } from '@shared/guards';
import { IAccessTokenPayload, ICrudController } from '@shared/interfaces';
import { SwaggerExample } from '@shared/swagger';
import { CreatePostDto, GetAllPostsDto, UpdatePostDto } from './dto';

@ApiTags('Посты')
@Controller('posts')
export class PostsController implements ICrudController<PostEntity, CreatePostDto, GetAllPostsDto, UpdatePostDto> {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@ApiOperation({ summary: 'Создание поста' })
	@ApiResponse({ status: 201, description: 'Успешное создание', type: PostEntity })
	@ApiResponse({ status: 400, description: 'Некорректный заголовок или контент поста' })
	@ApiResponse({ status: 401, description: 'Недостаточно прав' })
	@ApiResponse({ status: 404, description: 'Автор поста не найден' })
	@ApiCookieAuth()
	@UseGuards(AuthGuard)
	@Post()
	public async create(@Body() createDto: CreatePostDto, @Req() request: Request): Promise<PostEntity> {
		const { title, content } = createDto;
		return this.commandBus.execute(new CreatePostCommand(title, content, (request['user'] as IAccessTokenPayload).id));
	}

	@ApiOperation({ summary: 'Получение всех постов' })
	@ApiQuery({ name: 'offset', description: 'Количество для пропуска данных', type: 'number', required: false })
	@ApiQuery({ name: 'limit', description: 'Лимит данных', type: 'number', required: false })
	@ApiQuery({ name: 'order', description: 'Ключ для сортировки', enum: PostKey, required: false })
	@ApiQuery({ name: 'direction', description: 'Направление для сортировки', enum: SortDirection, required: false })
	@ApiQuery({ name: 'search', description: 'Поиск по заголовку или контенту', type: 'string', required: false })
	@ApiQuery({ name: 'authorId', description: 'Поиск по идентификатору автора', type: 'number', required: false })
	@ApiResponse({ status: 200, description: 'Успешное получение', type: [PostEntity] })
	@Get()
	public async getAll(@Query() getAllDto: GetAllPostsDto): Promise<PostEntity[]> {
		const { search, offset, limit, order, direction, authorId } = getAllDto;
		return this.queryBus.execute(
			new GetAllPostsQuery(Number(offset), Number(limit), order, direction, search, Number(authorId)),
		);
	}

	@ApiOperation({ summary: 'Получение одного поста по ID' })
	@ApiParam({ name: 'id', description: 'Идентификатор поста', example: SwaggerExample.Post.id })
	@ApiResponse({ status: 200, description: 'Успешное получение', type: PostEntity })
	@ApiResponse({ status: 404, description: 'Пост не найден' })
	@Get(':id')
	public async getOne(@Param('id') id: string): Promise<PostEntity> {
		return this.queryBus.execute(new GetOnePostQuery(Number(id)));
	}

	@ApiOperation({ summary: 'Редактирование данных поста' })
	@ApiParam({ name: 'id', description: 'Идентификатор поста', example: SwaggerExample.Post.id })
	@ApiResponse({ status: 200, description: 'Успешное редактирование', type: PostEntity })
	@ApiResponse({ status: 400, description: 'Некорректный заголовок или контент поста' })
	@ApiResponse({ status: 403, description: 'Недостаточно прав' })
	@ApiResponse({ status: 404, description: 'Пост не найден' })
	@ApiCookieAuth()
	@UseGuards(AuthGuard)
	@Patch(':id')
	public async update(@Param('id') id: string, @Body() updateDto: UpdatePostDto, @Req() request: Request): Promise<PostEntity> {
		const { title, content } = updateDto;
		return this.commandBus.execute(
			new UpdatePostCommand(Number(id), (request['user'] as IAccessTokenPayload).id, title, content),
		);
	}

	@ApiOperation({ summary: 'Удаление поста' })
	@ApiParam({ name: 'id', description: 'Идентификатор поста', example: SwaggerExample.Post.id })
	@ApiResponse({ status: 200, description: 'Успешное удаление', type: PostEntity })
	@ApiResponse({ status: 403, description: 'Недостаточно прав' })
	@ApiResponse({ status: 404, description: 'Пост не найден' })
	@ApiCookieAuth()
	@UseGuards(AuthGuard)
	@Delete(':id')
	public async delete(@Param('id') id: string, @Req() request: Request): Promise<PostEntity> {
		return this.commandBus.execute(new DeletePostCommand(Number(id), (request['user'] as IAccessTokenPayload).id));
	}
}
