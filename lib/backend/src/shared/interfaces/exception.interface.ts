import { HttpStatus } from '@nestjs/common';

export interface IException {
	endpoint: string;
	status: HttpStatus;
	messageUI: string;
	messageDebug: string;
	data?: unknown;
}
