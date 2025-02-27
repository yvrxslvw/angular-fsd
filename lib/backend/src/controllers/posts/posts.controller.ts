import { PostEntity, PostKey } from '@domains/post';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SortDirection } from '@shared/enums';
import { ICrudController } from '@shared/interfaces';
import { CreatePostDto, GetAllPostsDto, UpdatePostDto } from './dto';

@Controller('posts')
export class PostsController implements ICrudController<PostEntity, CreatePostDto, GetAllPostsDto, UpdatePostDto> {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@ApiOperation({ summary: 'Создание поста' })
	@ApiResponse({ status: 201, description: 'Успешное создание', type: PostEntity })
	@ApiResponse({ status: 400, description: 'Некорректный заголовок или контент поста' })
	@ApiResponse({ status: 404, description: 'Автор поста не найден' })
	@Post()
	public async create(@Body() createDto: CreatePostDto): Promise<PostEntity> {
		throw new Error('Method not implemented.');
	}

	@ApiOperation({ summary: 'Получение всех постов' })
	@ApiQuery({ name: 'offset', description: 'Количество для пропуска данных', type: 'number', required: false })
	@ApiQuery({ name: 'limit', description: 'Лимит данных', type: 'number', required: false })
	@ApiQuery({ name: 'order', description: 'Ключ для сортировки', enum: PostKey, required: false })
	@ApiQuery({ name: 'direction', description: 'Направление для сортировки', enum: SortDirection, required: false })
	@ApiQuery({ name: 'search', description: 'Поиск по заголовку или контенту', required: false })
	@ApiResponse({ status: 200, description: 'Успешное получение', type: [PostEntity] })
	@Get()
	public async getAll(@Query() getAllDto: GetAllPostsDto): Promise<PostEntity[]> {
		throw new Error('Method not implemented.');
	}

	@ApiOperation({ summary: 'Получение одного поста по ID' })
	@ApiParam({ name: 'id', description: 'Идентификатор поста', example: 1 })
	@ApiResponse({ status: 200, description: 'Успешное получение', type: PostEntity })
	@ApiResponse({ status: 404, description: 'Пост не найден' })
	@Get(':id')
	public async getOne(@Param('id') id: string): Promise<PostEntity> {
		throw new Error('Method not implemented.');
	}

	@ApiOperation({ summary: 'Редактирование данных поста' })
	@ApiParam({ name: 'id', description: 'Идентификатор поста', example: 1 })
	@ApiResponse({ status: 200, description: 'Успешное редактирование', type: PostEntity })
	@ApiResponse({ status: 400, description: 'Некорректный заголовок или контент поста' })
	@ApiResponse({ status: 404, description: 'Пост не найден' })
	@Patch(':id')
	public async update(@Param('id') id: string, @Body() updateDto: UpdatePostDto): Promise<PostEntity> {
		throw new Error('Method not implemented.');
	}

	@ApiOperation({ summary: 'Удаление поста' })
	@ApiParam({ name: 'id', description: 'Идентификатор поста', example: 1 })
	@ApiResponse({ status: 200, description: 'Успешное удаление', type: PostEntity })
	@ApiResponse({ status: 404, description: 'Пост не найден' })
	@Delete(':id')
	public async delete(@Param('id') id: string): Promise<PostEntity> {
		throw new Error('Method not implemented.');
	}
}
