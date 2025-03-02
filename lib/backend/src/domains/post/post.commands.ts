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
		public userId: number,
		public title?: string,
		public content?: string,
	) {}
}

export class DeletePostCommand {
	constructor(
		public id: number,
		public userId: number,
	) {}
}
