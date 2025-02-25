import { GetAllUsersHandler } from '@application/users/queries/get-all-users.query';
import { GetOneUserHandler } from '@application/users/queries/get-one-user.query';

export const QueryHandlers = [
	GetAllUsersHandler,
	GetOneUserHandler,
];
