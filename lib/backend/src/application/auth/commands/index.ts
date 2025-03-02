import { LoginHandler } from './login.handler';
import { LogoutHandler } from './logout.handler';
import { RefreshHandler } from './refresh.handler';
import { RegisterHandler } from './register.handler';

export const commandHandlers = [LoginHandler, RegisterHandler, RefreshHandler, LogoutHandler];
