export class CreatePostCommand {
	constructor(
		public title: string,
		public content: string,
		public authorId: number,
	) {}
}

export class UpdatePostCommand {
	constructor(
		public id: number,
		public title?: string,
		public content?: string,
	) {}
}

export class DeletePostCommand {
	constructor(public id: number) {}
}
