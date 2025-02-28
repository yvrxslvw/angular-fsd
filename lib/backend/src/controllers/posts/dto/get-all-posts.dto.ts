import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { PostKey } from '@domains/post';
import { SortDirection } from '@shared/enums';
import { IPagination } from '@shared/interfaces';

export class GetAllPostsDto implements IPagination<PostKey> {
	@IsOptional()
	declare search: string | undefined;

	@IsOptional()
	@IsNumberString({ no_symbols: true }, { message: 'Offset должно быть положительным числом' })
	declare offset: string | undefined;

	@IsOptional()
	@IsNumberString({ no_symbols: true }, { message: 'Limit должно быть положительным числом' })
	declare limit: string | undefined;

	@IsOptional()
	@IsEnum(PostKey, {
		message: "Order должно быть одним из значений: 'id', 'title', 'content', 'user', 'createdAt', 'updatedAt'",
	})
	declare order: PostKey | undefined;

	@IsOptional()
	@IsEnum(SortDirection, { message: "Direction должно быть одним из значений: 'asc', 'desc'" })
	declare direction: SortDirection | undefined;
}
