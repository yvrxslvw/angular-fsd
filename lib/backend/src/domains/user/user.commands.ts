export class CreateUserCommand {
	constructor(
		public login: string,
		public password: string,
	) {
	}
}

export class UpdateUserCommand {
	constructor(
		public id: number,
		public login?: string,
		public password?: string,
	) {
	}
}

export class DeleteUserCommand {
	constructor(
		public id: number,
	) {
	}
}
