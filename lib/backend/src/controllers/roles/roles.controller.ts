import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCookieAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
	CreateRoleCommand,
	DeleteRoleCommand,
	GetAllRolesQuery,
	GetOneRoleQuery,
	RoleEntity,
	RoleKey,
	UpdateRoleCommand,
} from '@domains/role';
import { Roles } from '@shared/decorators';
import { SortDirection } from '@shared/enums';
import { RolesGuard } from '@shared/guards';
import { ICrudController } from '@shared/interfaces';
import { SwaggerExample } from '@shared/swagger';
import { CreateRoleDto, GetAllRolesDto, UpdateRoleDto } from './dto';

@ApiTags('Роли')
@Controller('roles')
export class RolesController implements ICrudController<RoleEntity, CreateRoleDto, GetAllRolesDto, UpdateRoleDto> {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@ApiOperation({ summary: 'Создание роли' })
	@ApiResponse({ status: 201, description: 'Успешное создание', type: RoleEntity })
	@ApiResponse({ status: 400, description: 'Некорректный тег или наименование или роль уже существует' })
	@ApiCookieAuth()
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Post()
	public async create(@Body() createDto: CreateRoleDto): Promise<RoleEntity> {
		const { tag, name } = createDto;
		return this.commandBus.execute(new CreateRoleCommand(tag, name));
	}

	@ApiOperation({ summary: 'Получение всех ролей' })
	@ApiQuery({ name: 'offset', description: 'Количество для пропуска данных', type: 'number', required: false })
	@ApiQuery({ name: 'limit', description: 'Лимит данных', type: 'number', required: false })
	@ApiQuery({ name: 'order', description: 'Ключ для сортировки', enum: RoleKey, required: false })
	@ApiQuery({ name: 'direction', description: 'Направление для сортировки', enum: SortDirection, required: false })
	@ApiQuery({ name: 'search', description: 'Поиск по тегу или названию', type: 'string', required: false })
	@ApiResponse({ status: 200, description: 'Успешное получение', type: [RoleEntity] })
	@ApiCookieAuth()
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Get()
	public async getAll(@Query() getAllDto: GetAllRolesDto): Promise<RoleEntity[]> {
		const { search, offset, limit, order, direction } = getAllDto;
		return this.queryBus.execute(new GetAllRolesQuery(Number(offset), Number(limit), order, direction, search));
	}

	@ApiOperation({ summary: 'Получение одной роли по ID' })
	@ApiParam({ name: 'id', description: 'Идентификатор роли', example: SwaggerExample.Role.id })
	@ApiResponse({ status: 200, description: 'Успешное получение', type: RoleEntity })
	@ApiResponse({ status: 404, description: 'Роль не найдена' })
	@ApiCookieAuth()
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Get(':id')
	public async getOne(@Param('id') id: string): Promise<RoleEntity> {
		return this.queryBus.execute(new GetOneRoleQuery(+id));
	}

	@ApiOperation({ summary: 'Редактирование данных роли' })
	@ApiParam({ name: 'id', description: 'Идентификатор роли', example: SwaggerExample.Role.id })
	@ApiResponse({ status: 200, description: 'Успешное редактирование', type: RoleEntity })
	@ApiResponse({ status: 400, description: 'Некорректный тег или наименование или роль уже существует' })
	@ApiResponse({ status: 404, description: 'Роль не найдена' })
	@ApiCookieAuth()
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Patch(':id')
	public async update(@Param('id') id: string, @Body() updateDto: UpdateRoleDto): Promise<RoleEntity> {
		const { tag, name } = updateDto;
		return this.commandBus.execute(new UpdateRoleCommand(+id, tag, name));
	}

	@ApiOperation({ summary: 'Удаление роли' })
	@ApiParam({ name: 'id', description: 'Идентификатор роли', example: SwaggerExample.Role.id })
	@ApiResponse({ status: 200, description: 'Успешное удаление', type: RoleEntity })
	@ApiResponse({ status: 404, description: 'Роль не найдена' })
	@ApiCookieAuth()
	@UseGuards(RolesGuard)
	@Roles('ADMIN')
	@Delete(':id')
	public async delete(@Param('id') id: string): Promise<RoleEntity> {
		return this.commandBus.execute(new DeleteRoleCommand(+id));
	}
}
