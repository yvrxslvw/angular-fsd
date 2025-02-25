import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seed/users.seed';

const prisma = new PrismaClient();

async function main() {
	await seedUsers(prisma);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (err) => {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	});
