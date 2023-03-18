const { PrismaClient, Role, Difficulty } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const roles = [];
for (const key in Role) {
  roles.push(Role[key]);
}

function createRandomUser() {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(roles),
  };
}

function createRandomMovies() {
  return {
    title: faker.lorem.word({ length: { min: 5, max: 20 } }),
    description: faker.lorem.sentence(),
  };
}

const userCount = 3;
const movieCount = 10;

async function main() {
  try {
    console.log(`Start seeding ...`);

    // Users
    const users = await Promise.all(
      Array.from({ length: userCount }).map(async () => {
        return prisma.user.create({
          data: createRandomUser(),
        });
      })
    );
    console.log(`${userCount} new rows added to User Table`);

    // Movies
    const movies = await Promise.all(
      Array.from({ length: movieCount }).map(async () => {
        return prisma.movie.create({
          data: createRandomMovies(),
        });
      })
    );
    console.log(`${movieCount} new rows added to Movie Table`);

    console.log(`Seeding finished.`);
  } catch (error) {
    throw new Error(error.message);
  }
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
