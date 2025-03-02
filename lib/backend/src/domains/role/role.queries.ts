import { RoleKey } from '@domains/role/role.entity';
import { SortDirection } from '@shared/enums';

export class GetAllRolesQuery {
	constructor(
		public offset?: number,
		public limit?: number,
		public order?: RoleKey,
		public direction?: SortDirection,
		public search?: string,
	) {}
}

export class GetOneRoleQuery {
	constructor(public id: number) {}
}
