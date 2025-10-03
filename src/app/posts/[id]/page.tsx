import { notFound } from "next/navigation";
import { db } from "@/server/db";
import Image from "next/image";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import PostContentClient from "../PostContentClient";
import AdminEditButton from "./AdminEditButton";
import CommentSection from "./CommentSection";

function AuthorProfile({
  author,
}: {
  author:
    | {
        id: string | number;
        name?: string | null;
        image?: string | null;
        bio?: string | null;
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
    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
      {author.image ? (
        <Box
          sx={{
            width: 72,
            height: 72,
            position: "relative",
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
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
            flexShrink: 0,
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
        {author.bio && (
          <Typography level="body-sm" sx={{ color: "var(--cv-textMuted80)", mt: 0.5 }}>
            {author.bio}
          </Typography>
        )}
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
      tags: true,
      createdAt: true,
      createdBy: { select: { id: true, name: true, image: true, bio: true } },
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

  const postAuthor = (post.author ?? null) as {
    id: number;
    name: string | null;
    period: string | null;
    bio: string | null;
    image: string | null;
    imageBlob: Uint8Array | null;
    slug: string | null;
    books: { id: number; title: string; year: number | null }[];
  } | null;
  const authorImageSrc = postAuthor?.image
    ? String(postAuthor.image)
    : postAuthor?.imageBlob
      ? `/api/authors/${postAuthor.id}/image`
      : undefined;

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        "&::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23228b22\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M20 20 L25 15 L30 20 L25 25 Z M60 20 L65 15 L70 20 L65 25 Z M40 40 L45 35 L50 40 L45 45 Z\'/%3E%3Ccircle cx=\'15\' cy=\'40\' r=\'3\'/%3E%3Ccircle cx=\'65\' cy=\'60\' r=\'3\'/%3E%3Cpath d=\'M50 10 Q52 8, 54 10 T58 10\' stroke=\'%23ffd700\' stroke-opacity=\'0.04\' fill=\'none\'/%3E%3C/g%3E%3C/svg%3E")',
          zIndex: 0,
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: "auto", py: 6, px: { xs: 2, md: 4 }, position: "relative", zIndex: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        {/* Left sidebar with book image and author info */}
        <Box
          sx={{
            width: { xs: "100%", md: 280 },
            flexShrink: 0,
            position: { xs: "relative", md: "sticky" },
            top: { xs: 0, md: 24 },
          }}
        >
          {imageSrc && (
            <Box
              sx={{
                width: "100%",
                aspectRatio: "3/4",
                position: "relative",
                mb: 3,
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}
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

          {/* Author of the book info */}
          {post.author && (
            <Box>
              <Typography
                level="body-sm"
                sx={{ mb: 1, fontWeight: 700, color: "var(--cv-textMuted70)" }}
              >
                Autor do livro
              </Typography>

              {authorImageSrc && (
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "1/1",
                    position: "relative",
                    mb: 2,
                    borderRadius: "50%",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <Image
                    src={authorImageSrc}
                    alt={String(postAuthor?.name ?? "")}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </Box>
              )}

              <Typography level="title-md" sx={{ fontWeight: 700, mb: 0.5 }}>
                {String(postAuthor?.name ?? "")}
              </Typography>

              {postAuthor?.period && (
                <Typography
                  level="body-sm"
                  sx={{ color: "var(--cv-textMuted80)", mb: 1 }}
                >
                  {postAuthor.period}
                </Typography>
              )}

              {/* Genre/Tag */}
              {(() => {
                const tags = post.tags as string[] | undefined;
                return Array.isArray(tags) && tags.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    level="body-xs"
                    sx={{
                      color: "var(--cv-textMuted70)",
                      fontWeight: 700,
                      mb: 0.5,
                    }}
                  >
                    Gênero
                  </Typography>
                  <Typography level="body-sm">
                    {String(tags[0])
                      .replaceAll("_", " ")
                      .toLowerCase()
                      .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase())}
                  </Typography>
                </Box>
                );
              })()}

              {/* Social links placeholder */}
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor: "var(--cv-neutral100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "var(--cv-brazilGreen)",
                      color: "white",
                    },
                  }}
                >
                  <i className="fab fa-twitter" style={{ fontSize: "0.9rem" }} />
                </Box>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor: "var(--cv-neutral100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "var(--cv-brazilGreen)",
                      color: "white",
                    },
                  }}
                >
                  <i className="fab fa-facebook" style={{ fontSize: "0.9rem" }} />
                </Box>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor: "var(--cv-neutral100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "var(--cv-brazilGreen)",
                      color: "white",
                    },
                  }}
                >
                  <i className="fab fa-instagram" style={{ fontSize: "0.9rem" }} />
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {/* Main content area */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
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

          {/* Post creator info */}
          <Box sx={{ mb: 4, pb: 3, borderBottom: "1px solid var(--cv-neutral200)" }}>
            <Typography level="body-sm" sx={{ mb: 1, fontWeight: 700 }}>
              Publicado por
            </Typography>
            {(() => {
              const creator = post.createdBy as
                | { id: string; name?: string | null; image?: string | null; bio?: string | null }
                | null;
              return <AuthorProfile author={creator} />;
            })()}
          </Box>

          {/* Content with justified text */}
          <Box sx={{ "& .wmde-markdown p": { textAlign: "justify" } }}>
            <PostContentClient content={String(post.content ?? "")} />
          </Box>

          {/* Comments Section */}
          <CommentSection postId={post.id} />
        </Box>
      </Box>
      </Box>
    </Box>
  );
}
