import { IAccessTokenPayload } from '@shared/interfaces';

export class CreatePostCommand {
	constructor(
		public title: string,
		public content: string,
		public user: IAccessTokenPayload,
		public authorId?: number,
	) {}
}

export class UpdatePostCommand {
	constructor(
		public id: number,
		public user: IAccessTokenPayload,
		public title?: string,
		public content?: string,
	) {}
}

export class DeletePostCommand {
	constructor(
		public id: number,
		public user: IAccessTokenPayload,
	) {}
}
