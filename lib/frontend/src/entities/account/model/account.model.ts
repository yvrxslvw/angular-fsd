import { User } from '@entities/user';
import { ApiState } from '@shared/interfaces';

export namespace Account {
	export type Entity = User.Entity;

	export interface State {
		isLogged: boolean;
		account: Entity | null;
		loginApi: ApiState;
		registerApi: ApiState;
		refreshApi: ApiState;
		logoutApi: ApiState;
		getAccountApi: ApiState;
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
	}
}
