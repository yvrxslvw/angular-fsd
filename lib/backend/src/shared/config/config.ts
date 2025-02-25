import { config } from 'dotenv';

config({ path: '.env' });

export const AppConfig = {
	appHost: process.env.APP_HOST || 'localhost',
	appPort: +(process.env.APP_PORT || '3000'),
};
