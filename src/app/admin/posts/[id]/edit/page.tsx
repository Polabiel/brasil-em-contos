import { notFound } from "next/navigation";
import { requireAdminForPage } from "@/server/auth/requireAdmin";
import { db } from "@/server/db";
import EditPostClient from "./EditPostClient";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminForPage();

  const { id: idParam } = await params;

  const id = Number(idParam);

  if (Number.isNaN(id)) return notFound();

  const post = await db.post.findUnique({ where: { id } });

  if (!post) return notFound();

  const initialName = String(post.name ?? "");
  const initialContent = String(post.content ?? "");
  const initialDescription = String(post.description ?? "");
  const initialImage = String(post.image ?? "");
  const initialTags: string[] = Array.isArray(post.tags) ? post.tags as string[] : [];
  const initialAuthorId = post.authorId ?? null;

  return (
    <EditPostClient
      id={Number(post.id)}
      initialName={initialName}
      initialContent={initialContent}
      initialDescription={initialDescription}
      initialImage={initialImage}
      initialTags={initialTags}
      initialAuthorId={initialAuthorId}
    />
  );
}
