import { SQLiteService } from '../src/db/sqlite.service';
const sqlite = new SQLiteService();
async function main() {
  const tourist = await sqlite.role.create({
    data: {
      name: 'tourist',
    },
  });
  const localUser = await sqlite.role.create({
    data: {
      name: 'localUser',
    },
  });
}
main()
  .then(async () => {
    await sqlite.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await sqlite.$disconnect();
    process.exit(1);
  });
