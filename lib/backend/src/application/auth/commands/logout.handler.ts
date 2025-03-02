import { LogoutCommand } from '@domains/auth';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
	public async execute(command: LogoutCommand) {
		throw new Error('Method not implemented.');
	}
}
