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

	export namespace Action {
		export interface GetAllFulfilled {
			todos: Entity[];
		}

		export interface GetAllRejected {
			error: string;
		}

		export interface ToggleCompleted {
			id: number;
			completed: boolean;
		}

		export interface Delete {
			id: number;
		}
	}
}
