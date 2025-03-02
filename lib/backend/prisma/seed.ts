import { PrismaClient } from '@prisma/client';
import { seedPosts } from './seed/posts.seed';
import { seedRoles } from './seed/roles.seed';
import { seedUsers } from './seed/users.seed';

const prisma = new PrismaClient();

async function main() {
	await seedRoles(prisma);
	await seedUsers(prisma);
	await seedPosts(prisma);
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
