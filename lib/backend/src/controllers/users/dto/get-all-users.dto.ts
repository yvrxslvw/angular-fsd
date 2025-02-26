import { UserKey } from '@domains/user';
import { SortDirection } from '@shared/enums';
import { IsEnum, IsNumberString, IsOptional } from 'class-validator';

export class GetAllUsersDto {
	@IsOptional()
	@IsNumberString({}, { message: 'Offset должно быть числом' })
	declare offset?: string;

	@IsOptional()
	@IsNumberString({}, { message: 'Limit должно быть числом' })
	declare limit?: string;

	@IsOptional()
	@IsEnum(UserKey, { message: "Order должно быть одним из значений: 'id', 'login', 'createdAt', 'updatedAt'" })
	declare order?: UserKey;

	@IsOptional()
	@IsEnum(SortDirection, { message: "Direction должно быть одним из значений: 'asc', 'desc'" })
	declare direction?: SortDirection;

	@IsOptional()
	declare search?: string;
}
