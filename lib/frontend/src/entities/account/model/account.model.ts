import { User } from '@entities/user';

export namespace Account {
	export type Entity = User.Entity;

	export interface State {
		isLogged: boolean;
		isLoading: boolean;
		error: string | null;
		account: Entity | null;
	}

	export namespace Api {
		export type Response = Entity;

		export namespace Login {
			export interface Body {
				login: string;
				password: string;
				rememberMe: boolean;
			}
		}

		export namespace Register {
			export interface Body {
				login: string;
				password: string;
			}
		}
	}

	export namespace Action {
		export interface Fulfill {
			account: Entity;
		}

		export interface Reject {
			error: string;
		}

		export namespace Login {
			export type Request = Api.Login.Body;
		}

		export namespace Register {
			export type Request = Api.Register.Body;
		}
	}
}
