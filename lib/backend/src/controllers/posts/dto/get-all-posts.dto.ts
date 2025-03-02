import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { PostKey } from '@domains/post';
import { SortDirection } from '@shared/enums';
import { IPagination } from '@shared/interfaces';
import { getStringByEnum } from '@shared/utils';

export class GetAllPostsDto implements IPagination<PostKey> {
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
	declare order: PostKey | undefined;

	@IsOptional()
	@IsEnum(SortDirection, { message: "Поле direction должно быть одним из значений: 'asc', 'desc'" })
	declare direction: SortDirection | undefined;

	@IsOptional()
	@IsNumberString({ no_symbols: true }, { message: 'Поле authorId должно быть положительным числом' })
	declare authorId: string | undefined;
}
