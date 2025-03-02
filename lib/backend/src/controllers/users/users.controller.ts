import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCookieAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from '@domains/role';
import {
	AddUserRoleCommand,
	CreateUserCommand,
	DeleteUserCommand,
	GetAllUsersQuery,
	GetOneUserQuery,
	RemoveUserRoleCommand,
	UpdateUserCommand,
	UserEntity,
	UserKey,
} from '@domains/user';
import { Roles } from '@shared/decorators';
import { SortDirection } from '@shared/enums';
import { RolesGuard } from '@shared/guards';
import { ICrudController } from '@shared/interfaces';
import { SwaggerExample } from '@shared/swagger';
import { CreateUserDto, GetAllUsersDto, UpdateUserDto } from './dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController implements ICrudController<UserEntity, CreateUserDto, GetAllUsersDto, UpdateUserDto> {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@ApiOperation({ summary: 'Создание пользователя' })
	@ApiResponse({ status: 201, description: 'Успешное создание', type: UserEntity })
	@ApiResponse({ status: 400, description: 'Некорректный логин или пароль или пользователь уже существует' })
	@ApiResponse({ status: 403, description: 'Недостаточно прав' })
	@ApiCookieAuth()
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Post()
	public async create(@Body() createDto: CreateUserDto): Promise<UserEntity> {
		const { login, password } = createDto;
		return this.commandBus.execute(new CreateUserCommand(login, password));
	}

	@ApiOperation({ summary: 'Получение всех пользователей' })
	@ApiQuery({ name: 'offset', description: 'Количество для пропуска данных', type: 'number', required: false })
	@ApiQuery({ name: 'limit', description: 'Лимит данных', type: 'number', required: false })
	@ApiQuery({ name: 'order', description: 'Ключ для сортировки', enum: UserKey, required: false })
	@ApiQuery({ name: 'direction', description: 'Направление для сортировки', enum: SortDirection, required: false })
	@ApiQuery({ name: 'search', description: 'Поиск по логину', type: 'string', required: false })
	@ApiResponse({ status: 200, description: 'Успешное получение', type: [UserEntity] })
	@Get()
	public async getAll(@Query() getAllDto: GetAllUsersDto): Promise<UserEntity[]> {
		const { offset, limit, order, direction, search } = getAllDto;
		return this.queryBus.execute(new GetAllUsersQuery(Number(offset), Number(limit), order, direction, search));
	}

	@ApiOperation({ summary: 'Получение одного пользователя по ID' })
	@ApiParam({ name: 'id', description: 'Идентификатор пользователя', example: SwaggerExample.User.id })
	@ApiResponse({ status: 200, description: 'Успешное получение', type: UserEntity })
	@ApiResponse({ status: 404, description: 'Пользователь не найден' })
	@Get(':id')
	public async getOne(@Param('id') id: string): Promise<UserEntity> {
		return this.queryBus.execute(new GetOneUserQuery(+id));
	}

	@ApiOperation({ summary: 'Редактирование данных пользователя' })
	@ApiParam({ name: 'id', description: 'Идентификатор пользователя', example: SwaggerExample.User.id })
	@ApiResponse({ status: 200, description: 'Успешное редактирование', type: UserEntity })
	@ApiResponse({ status: 400, description: 'Некорректный логин или пароль или пользователь уже существует' })
	@ApiResponse({ status: 403, description: 'Недостаточно прав' })
	@ApiResponse({ status: 404, description: 'Пользователь не найден' })
	@ApiCookieAuth()
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Patch(':id')
	public async update(@Param('id') id: string, @Body() updateDto: UpdateUserDto): Promise<UserEntity> {
		const { login, password } = updateDto;
		return this.commandBus.execute(new UpdateUserCommand(+id, login, password));
	}

	@ApiOperation({ summary: 'Удаление пользователя' })
	@ApiParam({ name: 'id', description: 'Идентификатор пользователя', example: SwaggerExample.User.id })
	@ApiResponse({ status: 200, description: 'Успешное удаление', type: UserEntity })
	@ApiResponse({ status: 403, description: 'Недостаточно прав' })
	@ApiResponse({ status: 404, description: 'Пользователь не найден' })
	@ApiCookieAuth()
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Delete(':id')
	public async delete(@Param('id') id: string): Promise<UserEntity> {
		return this.commandBus.execute(new DeleteUserCommand(+id));
	}

	@ApiOperation({ summary: 'Добавление роли пользователю' })
	@ApiParam({ name: 'id', description: 'Идентификатор пользователя', example: SwaggerExample.User.id })
	@ApiParam({ name: 'roleId', description: 'Идентификатор роли', example: SwaggerExample.Role.id })
	@ApiResponse({ status: 200, description: 'Успешное добавление', type: UserEntity })
	@ApiResponse({ status: 403, description: 'Недостаточно прав' })
	@ApiResponse({ status: 404, description: 'Пользователь или роль не найдена' })
	@ApiCookieAuth()
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Put(':id/roles/:roleId')
	public async addRole(@Param('id') id: string, @Param('roleId') roleId: string): Promise<RoleEntity> {
		return this.commandBus.execute(new AddUserRoleCommand(+id, +roleId));
	}

	@ApiOperation({ summary: 'Удаление роли пользователя' })
	@ApiParam({ name: 'id', description: 'Идентификатор пользователя', example: SwaggerExample.User.id })
	@ApiParam({ name: 'roleId', description: 'Идентификатор роли', example: SwaggerExample.Role.id })
	@ApiResponse({ status: 200, description: 'Успешное удаление', type: UserEntity })
	@ApiResponse({ status: 403, description: 'Недостаточно прав' })
	@ApiResponse({ status: 404, description: 'Пользователь или роль не найдена' })
	@ApiCookieAuth()
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Delete(':id/roles/:roleId')
	public async removeRole(@Param('id') id: string, @Param('roleId') roleId: string): Promise<RoleEntity> {
		return this.commandBus.execute(new RemoveUserRoleCommand(+id, +roleId));
	}
}
