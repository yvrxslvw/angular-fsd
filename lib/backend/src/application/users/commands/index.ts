import { CreateUserHandler } from '@application/users/commands/create-user.command';
import { UpdateUserHandler } from '@application/users/commands/update-user.command';

export const CommandHandlers = [CreateUserHandler, UpdateUserHandler];
