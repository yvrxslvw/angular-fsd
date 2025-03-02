import { config } from 'dotenv';

config({ path: '.env' });

export const AppConfig = {
	appHost: process.env.APP_HOST || 'localhost',
	appPort: +(process.env.APP_PORT || '3000'),
	jwtSecret: process.env.JWT_SECRET || 'secret1234',
	frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4200',
};
