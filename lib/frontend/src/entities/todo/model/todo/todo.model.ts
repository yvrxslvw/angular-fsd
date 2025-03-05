export namespace Todo {
	export interface Entity {
		id: number;
		userId: number;
		title: string;
		completed: boolean;
	}

	export interface State {
		error: string | null;
		isLoading: boolean;
		todos: Entity[];
	}

	export namespace Api {
		export namespace GetAll {
			export type Response = Entity[];
		}

		export namespace GetOne {
			export interface Path {
				id: number;
			}

			export type Response = Entity;
		}

		export namespace Post {
			export interface Body {
				userId: number;
				title: string;
				completed: boolean;
			}

			export type Response = Entity;
		}

		export namespace Patch {
			export interface Path {
				id: number;
			}

			export interface Body {
				completed: boolean;
			}

			export type Response = Entity;
		}

		export namespace Delete {
			export interface Path {
				id: number;
			}

			export type Response = Entity;
		}
	}
}
