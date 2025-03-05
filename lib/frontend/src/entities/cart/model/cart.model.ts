export namespace Cart {
	export interface Entity {}

	export interface State {
		isLoading: boolean;
		error: string | null;
		cart: Entity | null;
	}

	export namespace Api {
		export namespace Get {
			export interface Params {
				companyId?: string;
			}

			export type Response = Entity[];
		}

		export namespace Patch {
			export interface Body {}

			export interface Params {
				companyId?: string;
			}

			export type Response = Entity;
		}

		export namespace PutPromoCode {
			export interface Params {
				companyId?: string;
			}

			export interface Body {
				code: string;
			}

			export type Response = Entity;
		}
	}

	export namespace Action {
		export interface GetSuccess {
			cart: Entity;
		}

		export interface GetError {
			error: string;
		}
	}
}
