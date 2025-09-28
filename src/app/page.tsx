import { db } from "@/server/db";
import Slogan from "@/app/_components/layout/Slogan";
import Sidebar from "@/app/_components/layout/Sidebar";
import PostsGrid from "@/app/_components/layout/PostsGrid";

type DBPost = {
  id: string | number | bigint;
  name: string | null;
  createdAt: Date | string | null;
  description: string | null;
  image: string | null;
};

export default async function Home() {

  const recent: DBPost[] = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
    include: {
      createdBy: true,
    },
  });

  const posts: Array<{ id: number; name: string; createdAt?: string; description?: string; image?: string }> = recent.map((r) => {
    return {
      id: Number(r.id),
      name: r.name ?? "",
      createdAt: r.createdAt
        ? typeof r.createdAt === "string"
          ? new Date(r.createdAt).toISOString()
          : r.createdAt instanceof Date
          ? r.createdAt.toISOString()
          : String(r.createdAt)
        : undefined,
      description: r.description ?? undefined,
      image: r.image ?? undefined,
    };
  });

  return (
    <>
      <Slogan />
      <main className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="md:col-span-9">
          <PostsGrid posts={posts} />
        </section>

        <aside className="md:col-span-3">
          <Sidebar />
        </aside>
      </main>
    </>
  );
}
