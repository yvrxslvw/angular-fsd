import { SortDirection } from '@shared/enums';
import { ApiState } from '@shared/interfaces';

export namespace User {
	export interface Entity {
		id: number;
		login: string;
		// TODO: move post to a separate interface
		posts: {
			id: number;
			title: string;
			content: string;
			createdAt: string;
			updatedAt: string;
		}[];
		// TODO: move role to a separate interface
		roles: {
			id: number;
			tag: string;
			name: string;
			createdAt: string;
			updatedAt: string;
		}[];
		createdAt: string;
		updatedAt: string;
	}

	export interface State {
		users: Record<number, Entity>;
		api: Record<Api.Method, ApiState>;
	}

	export namespace Api {
		export type Response = Entity;

		export type Method = 'post' | 'getAll' | 'getOne' | 'patch' | 'delete' | 'addRole' | 'removeRole';

		export namespace Post {
			export interface Body {
				login: string;
				password: string;
			}
		}

		export namespace GetAll {
			export interface Params {
				search?: string;
				offset?: number;
				limit?: number;
				order?: keyof Omit<Entity, 'posts' | 'roles'>;
				direction?: SortDirection;
			}

			export type Response = Entity[];
		}

		export namespace GetOne {
			export interface Path {
				id: string | number;
			}
		}

		export namespace Patch {
			export interface Path {
				id: string | number;
			}

			export interface Body {
				login?: string;
				password?: string;
			}
		}

		export namespace Delete {
			export interface Path {
				id: string | number;
			}
		}

		export namespace AddRole {
			export interface Path {
				id: string | number;
				roleId: string | number;
			}
		}

		export namespace RemoveRole {
			export interface Path {
				id: string | number;
				roleId: string | number;
			}
		}
	}
}
