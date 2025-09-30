import { notFound } from "next/navigation";
import { db } from "@/server/db";
import Image from "next/image";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import PostContentClient from "../PostContentClient";
import AdminEditButton from "./AdminEditButton";

function AuthorProfile({
  author,
}: {
  author:
    | {
        id: string | number;
        name?: string | null;
        image?: string | null;
      }
    | null;
}) {
  if (!author)
    return (
      <Typography level="body-sm" sx={{ color: "var(--cv-textMuted80)" }}>
        Autor desconhecido
      </Typography>
    );

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      {author.image ? (
        <Box
          sx={{
            width: 72,
            height: 72,
            position: "relative",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image
            src={String(author.image)}
            alt={String(author.name ?? "")}
            fill
            style={{ objectFit: "cover" }}
            unoptimized
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "var(--cv-neutral100)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "var(--cv-neutral500)" }}>
            {String(author.name ?? "").slice(0, 1).toUpperCase()}
          </span>
        </Box>
      )}
      <Box>
        <Typography level="body-md" sx={{ fontWeight: 600 }}>
          {String(author.name ?? "")}
        </Typography>
      </Box>
    </Box>
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (Number.isNaN(id)) return notFound();

  const post = await db.post.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      content: true,
      description: true,
      image: true,
      imageBlob: true,
      createdAt: true,
      createdBy: { select: { id: true, name: true, image: true } },
      author: {
        select: {
          id: true,
          name: true,
          period: true,
          bio: true,
          image: true,
          imageBlob: true,
          slug: true,
          books: { select: { id: true, title: true, year: true }, take: 5 },
        },
      },
    },
  });
  if (!post) return notFound();
  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const imageSrc: string | undefined = post.image
    ? String(post.image)
    : post.imageBlob
      ? `/api/posts/${post.id}/image`
      : undefined;

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", py: 6 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 220px",
          gap: 4,
          alignItems: "start",
        }}
      >
        <Box>
          {imageSrc && (
            <Box
              sx={{ width: "100%", height: 360, mb: 3, position: "relative" }}
            >
              <Image
                src={imageSrc}
                alt={post.name}
                fill
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Typography level="h3" sx={{ flexGrow: 1 }}>
              {post.name}
            </Typography>
            <AdminEditButton postId={post.id} />
          </Box>
          <Typography
            level="body-xs"
            sx={{ color: "var(--cv-textMuted80)", mb: 3 }}
          >
            {date}
          </Typography>
          <PostContentClient content={String(post.content ?? "")} />
        </Box>

        <Box sx={{ borderLeft: "1px solid rgba(0,0,0,0.04)", pl: 3 }}>
          <Typography level="body-md" sx={{ mb: 2, fontWeight: 700 }}>
            Autor do post
          </Typography>
          {(() => {
            const creator = post.createdBy as
              | { id: string; name?: string | null; image?: string | null }
              | null;
            return <AuthorProfile author={creator} />;
          })()}

          {/* Author of the book (if different) */}
          {post.author && (
            <Box sx={{ mt: 4 }}>
              <Typography level="body-md" sx={{ mb: 2, fontWeight: 700 }}>
                Autor do livro
              </Typography>

              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                {post.author.image || post.author.imageBlob ? (
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      position: "relative",
                      borderRadius: "50%",
                      overflow: "hidden",
                      flex: "0 0 auto",
                    }}
                  >
                    <Image
                      src={
                        post.author.image ??
                        `/api/authors/${post.author.id}/image`
                      }
                      alt={String(post.author.name ?? "")}
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "var(--cv-neutral100)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "0 0 auto",
                    }}
                  >
                    <span style={{ color: "var(--cv-neutral500)" }}>
                      {String(post.author.name ?? "")
                        .slice(0, 1)
                        .toUpperCase()}
                    </span>
                  </Box>
                )}

                <Box>
                  <Typography level="body-md" sx={{ fontWeight: 600 }}>
                    {String(post.author.name ?? "")}
                  </Typography>

                  {post.author.period && (
                    <Typography
                      level="body-sm"
                      sx={{ color: "var(--cv-textMuted80)" }}
                    >
                      {post.author.period}
                    </Typography>
                  )}

                  {post.author.bio && (
                    <Typography
                      level="body-sm"
                      sx={{ mt: 1, color: "var(--cv-textMuted80)" }}
                    >
                      {String(post.author.bio).slice(0, 240)}
                      {String(post.author.bio).length > 240 ? "…" : ""}
                    </Typography>
                  )}

                  {post.author.books &&
                    post.author.books.length > 0 &&
                    (() => {
                      const books = post.author.books as {
                        id: number;
                        title: string;
                        year?: number;
                      }[];
                      return (
                        <Box sx={{ mt: 2 }}>
                          <Typography
                            level="body-xs"
                            sx={{
                              color: "var(--cv-textMuted70)",
                              fontWeight: 700,
                              mb: 1,
                            }}
                          >
                            Obras
                          </Typography>
                          <Box component="ul" sx={{ pl: 2, m: 0 }}>
                            {books.map((b) => (
                              <Box
                                component="li"
                                key={b.id}
                                sx={{ color: "var(--cv-textPrimary)" }}
                              >
                                {b.title}
                                {b.year ? ` (${b.year})` : ""}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      );
                    })()}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
