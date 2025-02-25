import { faker } from '@faker-js/faker/locale/en';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const seedUsers = async (prisma: PrismaClient) => {
	await prisma.user.deleteMany();
	await prisma.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1;`;

	await prisma.user.create({
		data: {
			login: 'yvrxslvw',
			password: await bcrypt.hash('1234', 10),
		},
	});

	for (let i = 0; i < 99; i++) {
		await prisma.user.create({
			data: {
				login: faker.internet.username(),
				password: await bcrypt.hash(faker.internet.password(), 10),
			},
		});
	}
};
