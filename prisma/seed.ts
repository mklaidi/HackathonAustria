import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const tourist = await prisma.role.create({
    data: {
      name: 'tourist',
    },
  });
  const localUser = await prisma.role.create({
    data: {
      name: 'localUser',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
