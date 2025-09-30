import { db } from "@/server/db";

async function main() {
  // use Prisma client methods for seeding
  await db.book.deleteMany();
  await db.post.deleteMany();
  await db.author.deleteMany();

  const a1 = await db.author.create({
    data: {
      name: "Machado de Assis",
      period: "Realismo",
      bio: "Escritor brasileiro, autor de Dom Casmurro e Memórias Póstumas de Brás Cubas.",
    },
  });
  const a2 = await db.author.create({
    data: {
      name: "Clarice Lispector",
      period: "Modernismo/Contemporâneo",
      bio: "Jornalista e escritora conhecida por sua prosa introspectiva.",
    },
  });

  if (a1) {
    await db.book.createMany({
      data: [
        { title: "Dom Casmurro", year: 1899, authorId: a1.id },
        {
          title: "Memórias Póstumas de Brás Cubas",
          year: 1881,
          authorId: a1.id,
        },
      ],
    });
  }
  if (a2) {
    await db.book.create({
      data: { title: "A Hora da Estrela", year: 1977, authorId: a2.id },
    });
  }

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void db.$disconnect();
  });
