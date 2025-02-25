import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SortDirection } from '@shared/enums';
import {
	CreateUserCommand,
	DeleteUserCommand,
	GetAllUsersQuery,
	GetOneUserQuery,
	UpdateUserCommand,
	UserEntity,
	UserKey,
} from '../../domains/user';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
	constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {
	}

	@ApiOperation({ summary: 'Создание пользователя' })
	@ApiResponse({ status: 201, description: 'Успешное создание', type: UserEntity })
	@ApiResponse({ status: 400, description: 'Некорректный логин или пароль или пользователь уже существует' })
	@Post()
	public async create(@Body() createUserDto: CreateUserDto) {
		return this.commandBus.execute(new CreateUserCommand(createUserDto.login, createUserDto.password));
	}

	@ApiOperation({ summary: 'Получение всех пользователей' })
	@ApiQuery({
		name: 'offset',
		description: 'Количество для пропуска данных',
		type: 'number',
		default: 0,
		required: false,
	})
	@ApiQuery({ name: 'limit', description: 'Лимит данных', type: 'number', default: 10, required: false })
	@ApiQuery({ name: 'order', description: 'Ключ для сортировки', enum: UserKey, required: false })
	@ApiQuery({ name: 'direction', description: 'Направление для сортировки', enum: SortDirection, required: false })
	@ApiResponse({ status: 200, description: 'Успешное получение', type: [UserEntity] })
	@Get()
	public async getAll(
		@Query('offset') offset: string,
		@Query('limit') limit: string,
		@Query('order') order: UserKey,
		@Query('direction') direction: SortDirection,
	) {
		return this.queryBus.execute(new GetAllUsersQuery(+offset, +limit, order, direction));
	}

	@ApiOperation({ summary: 'Получение одного пользователя по ID' })
	@ApiParam({ name: 'id', description: 'Идентификатор пользователя', example: 1 })
	@ApiResponse({ status: 200, description: 'Успешное получение', type: UserEntity })
	@ApiResponse({ status: 404, description: 'Пользователь не найден' })
	@Get(':id')
	public async getOne(@Param('id') id: string) {
		return this.queryBus.execute(new GetOneUserQuery(+id));
	}

	@ApiOperation({ summary: 'Редактирование данных пользователя' })
	@ApiParam({ name: 'id', description: 'Идентификатор пользователя', example: 1 })
	@ApiResponse({ status: 200, description: 'Успешное редактирование', type: UserEntity })
	@ApiResponse({ status: 400, description: 'Некорректный логин или пароль или пользователь уже существует' })
	@Patch(':id')
	public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.commandBus.execute(new UpdateUserCommand(+id, updateUserDto.login, updateUserDto.password));
	}

	@ApiOperation({ summary: 'Удаление пользователя' })
	@ApiParam({ name: 'id', description: 'Идентификатор пользователя', example: 1 })
	@ApiResponse({ status: 200, description: 'Успешное удаление', type: UserEntity })
	@ApiResponse({ status: 404, description: 'Пользователь не найден' })
	@Delete(':id')
	public async delete(@Param('id') id: string) {
		return this.commandBus.execute(new DeleteUserCommand(+id));
	}
}
