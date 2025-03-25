import { ApiState } from '@shared/interfaces';
import { User } from '../../user';

export namespace Account {
	export type Entity = User.Entity;

	export interface State {
		isLogged: boolean;
		account: Entity | null;
		api: Record<Api.Method, ApiState>;
	}

	export namespace Api {
		export type Response = Entity;

		export type Method = 'getProfile' | 'login' | 'register' | 'refresh' | 'logout';

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
		export interface Success {
			account: Entity;
		}

		export interface Error {
			error: string;
		}
	}
}
