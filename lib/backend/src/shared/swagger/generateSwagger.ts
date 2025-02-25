import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const generateSwagger = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('Angular Feature-Sliced Design')
		.setVersion('1.0.0')
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/api/doc', app, documentFactory);
};
