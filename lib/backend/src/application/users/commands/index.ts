import { AddUserRoleHandler } from './add-user-role.handler';
import { CreateUserHandler } from './create-user.handler';
import { DeleteUserHandler } from './delete-user.handler';
import { RemoveUserRoleHandler } from './remove-user-role.handler';
import { UpdateUserHandler } from './update-user.handler';

export const CommandHandlers = [
	CreateUserHandler,
	UpdateUserHandler,
	DeleteUserHandler,
	AddUserRoleHandler,
	RemoveUserRoleHandler,
];
