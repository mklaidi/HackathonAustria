import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.role.create({
    data: {
      name: 'Admin',
    },
  });
  const john = await prisma.user.create({
    data: {
      email: 'john',
      fname: 'john',
      lname: 'g',
      password: 'changeme',
      role: {
        connect: {
          name: 'Admin',
        },
      },
    },
  });
  console.log({ john });
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
