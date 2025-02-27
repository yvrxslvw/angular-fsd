import { faker } from '@faker-js/faker/locale/en';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const seedUsers = async (prisma: PrismaClient) => {
	await prisma.$queryRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;

	await prisma.user.create({
		data: {
			login: 'yvrxslvw',
			password: await bcrypt.hash('1234', 10),
		},
	});

	for (let i = 2; i <= 100; i++) {
		await prisma.user.create({
			data: {
				login: faker.internet.username(),
				password: await bcrypt.hash(faker.internet.password(), 10),
			},
		});
	}
};
