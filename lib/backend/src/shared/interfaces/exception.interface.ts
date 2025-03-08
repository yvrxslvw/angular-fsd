import { HttpStatus } from '@nestjs/common';

export interface IException {
	dateTime: Date;
	endpoint: string;
	status: HttpStatus;
	messageUI: string;
	messageDebug?: string;
	data?: unknown;
}
