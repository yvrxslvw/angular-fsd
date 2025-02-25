import { SortDirection } from '@shared/enums';
import { UserKey } from './user.entity';

export class GetAllUsersQuery {
	constructor(
		public offset?: number,
		public limit?: number,
		public order?: UserKey,
		public direction?: SortDirection,
	) {
	}
}

export class GetOneUserQuery {
	constructor(
		public id: number,
	) {
	}
}
