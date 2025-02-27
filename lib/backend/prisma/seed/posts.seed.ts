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

	for (let i = 2; i <= 200; i++) {
		if (i === 101) continue;
		await prisma.post.create({
			data: {
				title: faker.lorem.sentence(),
				content: faker.lorem.text(),
				authorId: i > 100 ? i - 100 : i,
			},
		});
	}
};
