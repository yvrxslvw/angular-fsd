import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { UserKey } from '@domains/user';
import { SortDirection } from '@shared/enums';
import { IPagination } from '@shared/interfaces';
import { getStringByEnum } from '@shared/utils';

export class GetAllUsersDto implements IPagination<UserKey> {
	@IsOptional()
	declare search: string | undefined;

	@IsOptional()
	@IsNumberString({ no_symbols: true }, { message: 'Поле offset должно быть положительным числом' })
	declare offset: string | undefined;

	@IsOptional()
	@IsNumberString({ no_symbols: true }, { message: 'Поле limit должно быть положительным числом' })
	declare limit: string | undefined;

	@IsOptional()
	@IsEnum(UserKey, { message: `Поле order должно быть одним из значений: ${getStringByEnum(UserKey)}` })
	declare order: UserKey | undefined;

	@IsOptional()
	@IsEnum(SortDirection, { message: "Поле direction должно быть одним из значений: 'asc', 'desc'" })
	declare direction: SortDirection | undefined;
}
