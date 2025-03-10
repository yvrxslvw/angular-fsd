import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { PostKey } from '@domains/post';
import { RoleKey } from '@domains/role';
import { SortDirection } from '@shared/enums';
import { getStringByEnum } from '@shared/utils';

export class GetAllRolesDto {
	@IsOptional()
	declare search: string | undefined;

	@IsOptional()
	@IsNumberString({ no_symbols: true }, { message: 'Поле offset должно быть положительным числом' })
	declare offset: string | undefined;

	@IsOptional()
	@IsNumberString({ no_symbols: true }, { message: 'Поле limit должно быть положительным числом' })
	declare limit: string | undefined;

	@IsOptional()
	@IsEnum(PostKey, { message: `Поле order должно быть одним из значений: ${getStringByEnum(PostKey)}` })
	declare order: RoleKey | undefined;

	@IsOptional()
	@IsEnum(SortDirection, { message: "Поле direction должно быть одним из значений: 'asc', 'desc'" })
	declare direction: SortDirection | undefined;
}
