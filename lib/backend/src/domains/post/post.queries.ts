import { SortDirection } from '@shared/enums';
import { PostKey } from './post.entity';

export class GetAllPostsQuery {
	constructor(
		public offset?: number,
		public limit?: number,
		public order?: PostKey,
		public direction?: SortDirection,
		public search?: string,
		public authorId?: number,
	) {}
}

export class GetOnePostQuery {
	constructor(public id: number) {}
}
