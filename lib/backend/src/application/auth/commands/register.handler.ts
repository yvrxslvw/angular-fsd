import { RegisterCommand } from '@domains/auth';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
	public async execute(command: RegisterCommand) {
		throw new Error('Method not implemented.');
	}
}
