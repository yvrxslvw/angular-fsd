import { User } from '@entities/user';
import { SortDirection } from '@shared/enums';
import { ApiState } from '@shared/interfaces';

export namespace Role {
	export interface Entity {
		id: number;
		tag: string;
		name: string;
		users: User.Entity[];
		createdAt: string;
		updatedAt: string;
	}

	export interface State {
		roles: Record<number, Entity>;
		api: Record<Api.Method, ApiState>;
	}

	export namespace Api {
		export type Response = Entity;

		export type Method = 'post' | 'getAll' | 'getOne' | 'patch' | 'delete';

		export namespace Post {
			export interface Body {
				tag: string;
				name: string;
			}
		}

		export namespace GetAll {
			export interface Params {
				search?: string;
				direction?: SortDirection;
				order?: keyof Entity;
				limit?: number;
				offset?: number;
			}

			export type Response = Entity[];
		}

		export namespace GetOne {
			export interface Path {
				id: number;
			}
		}

		export namespace Patch {
			export interface Path {
				id: number;
			}

			export interface Body {
				tag?: string;
				name?: string;
			}
		}

		export namespace Delete {
			export interface Path {
				id: number;
			}
		}
	}
}
