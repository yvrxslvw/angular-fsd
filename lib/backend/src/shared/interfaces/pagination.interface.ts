import { SortDirection } from '@shared/enums';

export interface IPagination<K> {
	search: string | undefined;
	offset: string | undefined;
	limit: string | undefined;
	order: K | undefined;
	direction: SortDirection | undefined;
}
