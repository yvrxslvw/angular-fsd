import { faker } from '@faker-js/faker/locale/en';
import { PrismaClient } from '@prisma/client';

export const seedPosts = async (prisma: PrismaClient) => {
	await prisma.$queryRaw`TRUNCATE TABLE "Post" RESTART IDENTITY CASCADE`;

	for (let i = 1; i <= 200; i++) {
		await prisma.post.create({
			data: {
				title: faker.lorem.sentence(),
				content: faker.lorem.text(),
				authorId: i > 100 ? i - 100 : i,
			},
		});
	}
};
