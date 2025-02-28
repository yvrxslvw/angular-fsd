import { faker } from '@faker-js/faker/locale/en';
import { PrismaClient } from '@prisma/client';

export const seedPosts = async (prisma: PrismaClient) => {
	await prisma.$queryRaw`TRUNCATE TABLE "Post" RESTART IDENTITY CASCADE`;

	await prisma.post.create({
		data: {
			title: 'Hi',
			content: 'Hi',
			authorId: 1,
		},
	});
	await prisma.post.create({
		data: {
			title: 'Hi',
			content: 'Hi',
			authorId: 1,
		},
	});

	for (let i = 2; i <= 100.5; i += 0.5) {
		await prisma.post.create({
			data: {
				title: faker.lorem.sentence(),
				content: faker.lorem.text(),
				authorId: Math.floor(i),
			},
		});
	}
};
