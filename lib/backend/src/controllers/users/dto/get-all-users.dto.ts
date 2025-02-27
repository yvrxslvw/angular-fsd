import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { UserKey } from '@domains/user';
import { SortDirection } from '@shared/enums';
import { IPagination } from '@shared/interfaces';

export class GetAllUsersDto implements IPagination<UserKey> {
	@IsOptional()
	declare search: string | undefined;

	@IsOptional()
	@IsNumberString({}, { message: 'Offset должно быть числом' })
	declare offset: string | undefined;

	@IsOptional()
	@IsNumberString({}, { message: 'Limit должно быть числом' })
	declare limit: string | undefined;

	@IsOptional()
	@IsEnum(UserKey, { message: "Order должно быть одним из значений: 'id', 'login', 'createdAt', 'updatedAt'" })
	declare order: UserKey | undefined;

	@IsOptional()
	@IsEnum(SortDirection, { message: "Direction должно быть одним из значений: 'asc', 'desc'" })
	declare direction: SortDirection | undefined;
}
