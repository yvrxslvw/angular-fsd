import { SortDirection } from '@shared/enums';

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
		isLoading: boolean;
		isEndOfData: boolean;
		isSuccess: boolean | null;
		error: string | null;
		users: Record<number, Entity>;
	}

	export namespace Api {
		export type Response = Entity;

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

	export namespace Action {
		export interface FulfillOne {
			user: Entity;
		}

		export interface FulfillMany {
			users: Entity[];
		}

		export interface Reject {
			error: string;
		}

		export type Create = Api.Post.Body;
		export type GetAll = Api.GetAll.Params;
		export type GetOne = Api.GetOne.Path;
		export type Patch = Api.Patch.Path & Api.Patch.Body;
		export type Delete = Api.Delete.Path;
		export type AddRole = Api.AddRole.Path;
		export type RemoveRole = Api.RemoveRole.Path;
	}
}
