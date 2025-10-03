import { requireAdminForPage } from "@/server/auth/requireAdmin";
import { db } from "@/server/db";
import AdminPostsClient from "./AdminPostsClient";

export default async function AdminPostsPage() {
  await requireAdminForPage();

  const posts = await db.post.findMany({
    select: {
      id: true,
      name: true,
      content: true,
      description: true,
      image: true,
      tags: true,
      createdAt: true,
      updatedAt: true,
      featured: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return <AdminPostsClient posts={posts} />;
}
