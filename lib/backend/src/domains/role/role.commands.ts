export class CreateRoleCommand {
	constructor(
		public tag: string,
		public name: string,
	) {}
}

export class UpdateRoleCommand {
	constructor(
		public id: number,
		public tag?: string,
		public name?: string,
	) {}
}

export class DeleteRoleCommand {
	constructor(public id: number) {}
}
