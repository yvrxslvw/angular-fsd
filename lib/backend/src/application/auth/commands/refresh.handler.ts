import { RefreshCommand } from '@domains/auth';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RefreshCommand)
export class RefreshHandler implements ICommandHandler<RefreshCommand> {
	public async execute(command: RefreshCommand) {
		throw new Error('Method not implemented.');
	}
}
