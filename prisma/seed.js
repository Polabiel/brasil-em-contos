import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  // simple seed using raw SQL to avoid depending on generated prisma client methods
  await db.$executeRawUnsafe(`DELETE FROM "Book"`);
  await db.$executeRawUnsafe(`DELETE FROM "Post"`);
  await db.$executeRawUnsafe(`DELETE FROM "Author"`);

  const r1 = await db.$queryRawUnsafe(`INSERT INTO "Author" (name, period, bio) VALUES ($1, $2, $3) RETURNING id`, 'Machado de Assis', 'Realismo', 'Escritor brasileiro, autor de Dom Casmurro e Memórias Póstumas de Brás Cubas.');
  const id1 = Array.isArray(r1) && r1.length > 0 && typeof r1[0].id !== 'undefined' ? Number(r1[0].id) : undefined;
  const r2 = await db.$queryRawUnsafe(`INSERT INTO "Author" (name, period, bio) VALUES ($1, $2, $3) RETURNING id`, 'Clarice Lispector', 'Modernismo/Contemporâneo', 'Jornalista e escritora conhecida por sua prosa introspectiva.');
  const id2 = Array.isArray(r2) && r2.length > 0 && typeof r2[0].id !== 'undefined' ? Number(r2[0].id) : undefined;

  if (id1) {
    await db.$executeRawUnsafe(`INSERT INTO "Book" (title, year, "authorId") VALUES ($1, $2, $3)`, 'Dom Casmurro', 1899, id1);
    await db.$executeRawUnsafe(`INSERT INTO "Book" (title, year, "authorId") VALUES ($1, $2, $3)`, 'Memórias Póstumas de Brás Cubas', 1881, id1);
  }
  if (id2) {
    await db.$executeRawUnsafe(`INSERT INTO "Book" (title, year, "authorId") VALUES ($1, $2, $3)`, 'A Hora da Estrela', 1977, id2);
  }

  console.log('Seed completed');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => { void db.$disconnect(); });