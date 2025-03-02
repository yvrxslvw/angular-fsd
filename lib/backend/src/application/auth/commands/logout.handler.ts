/* eslint @typescript-eslint/require-await: off */

import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LogoutCommand } from '@domains/auth';
import { clearTokens } from '@shared/utils';

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
	public async execute(command: LogoutCommand) {
		const { response } = command;
		clearTokens(response);
		return response.sendStatus(HttpStatus.NO_CONTENT);
	}
}
