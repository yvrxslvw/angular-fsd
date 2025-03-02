import { Response } from 'express';

export class LoginCommand {
	constructor(
		public login: string,
		public password: string,
		public rememberMe: boolean,
		public response: Response,
	) {}
}

export class RegisterCommand {
	constructor(
		public login: string,
		public password: string,
		public response: Response,
	) {}
}

export class RefreshCommand {
	constructor(
		public refreshToken: string | undefined,
		public response: Response,
	) {}
}

export class LogoutCommand {
	constructor(public response: Response) {}
}
