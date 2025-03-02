import { PrismaClient } from '@prisma/client';

export const seedRoles = async (prisma: PrismaClient) => {
	await prisma.$queryRaw`TRUNCATE TABLE "Role" RESTART IDENTITY CASCADE`;

	await prisma.role.create({
		data: {
			tag: 'USER',
			name: 'Пользователь',
		},
	});

	await prisma.role.create({
		data: {
			tag: 'ADMIN',
			name: 'Администратор',
		},
	});
};
