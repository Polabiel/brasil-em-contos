import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { db } from "@/server/db";
import Slogan from "@/app/_components/layout/Slogan";
import Sidebar from "@/app/_components/layout/Sidebar";
import PostsGrid from "@/app/_components/layout/PostsGrid";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  const recent = await db.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 4,
    include: {
      createdBy: true
    }
  });

  return (
    <HydrateClient>
      <Slogan />
      <main className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="md:col-span-9">
          <PostsGrid posts={recent.map((r) => ({ id: Number(r.id), name: r.name, createdAt: r.createdAt?.toString() }))} />
        </section>

        <aside className="md:col-span-3">
          <Sidebar />
        </aside>
      </main>
    </HydrateClient>
  );
}
