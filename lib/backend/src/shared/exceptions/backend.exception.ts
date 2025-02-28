import { HttpStatus } from '@nestjs/common';

export class BackendException {
	public readonly status: HttpStatus;
	public readonly messageUI: string;
	public readonly messageDebug: string;
	public readonly data?: unknown;

	constructor(status: HttpStatus, messageUI: string, messageDebug: string, data?: unknown) {
		this.status = status;
		this.messageUI = messageUI;
		this.messageDebug = messageDebug;
		this.data = data;
	}
}
