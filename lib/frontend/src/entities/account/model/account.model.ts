export namespace Account {
	export interface Entity {}

	export interface State {
		isLoading: boolean;
		error: string | null;
		account: Entity | null;
		selectedCompanyId: string | null;
	}

	export namespace Api {
		export namespace Get {
			export type Response = Entity;
		}
	}

	export namespace Action {
		export interface GetSuccess {
			account: Entity;
		}

		export interface GetError {
			error: string;
		}

		export interface SelectCompany {
			id: string | null;
		}
	}
}
