export namespace Account {
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
		isLogged: boolean;
		isLoading: boolean;
		error: string | null;
		account: Entity | null;
	}

	export namespace Api {
		export namespace Get {
			export type Response = Entity;
		}

		export namespace Login {
			export interface Body {
				login: string;
				password: string;
				rememberMe: boolean;
			}

			export type Response = Entity;
		}

		export namespace Register {
			export interface Body {
				login: string;
				password: string;
			}

			export type Response = Entity;
		}

		export namespace Refresh {
			export type Response = Entity;
		}

		export namespace Logout {
			export type Response = Entity;
		}
	}

	export namespace Action {
		export namespace Get {
			export interface Fulfill {
				account: Entity;
			}
		}

		export namespace Login {
			export interface Request {
				login: string;
				password: string;
				rememberMe: boolean;
			}

			export interface Fulfill {
				account: Entity;
			}

			export interface Reject {
				error: string;
			}
		}

		export namespace Register {
			export interface Request {
				login: string;
				password: string;
			}

			export interface Fulfill {
				account: Entity;
			}

			export interface Reject {
				error: string;
			}
		}

		export namespace Logout {
			export interface Reject {
				error: string;
			}
		}
	}
}
