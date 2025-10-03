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
      tag: true,
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

  const authorImageSrc = post.author?.image
    ? String(post.author.image)
    : post.author?.imageBlob
      ? `/api/authors/${post.author.id}/image`
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
      {/* Top-left corner decoration */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: { xs: 120, md: 180 },
          height: { xs: 120, md: 180 },
          zIndex: 10,
          pointerEvents: "none",
          opacity: 0.5,
          background: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23228b22;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ffd700;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0 0 L180 0 L0 180 Z' fill='url(%23grad1)' opacity='0.4'/%3E%3Cpath d='M20 20 L40 10 L60 20 L40 30 Z' fill='%23228b22' opacity='0.6'/%3E%3Cpath d='M50 50 L70 40 L90 50 L70 60 Z' fill='%23ffd700' opacity='0.5'/%3E%3Ccircle cx='30' cy='80' r='8' fill='%23228b22' opacity='0.4'/%3E%3Ccircle cx='100' cy='40' r='6' fill='%23ffd700' opacity='0.5'/%3E%3Cpath d='M10 40 Q15 35 20 40 T30 40' stroke='%23228b22' stroke-width='2' fill='none' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Top-right corner decoration */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: { xs: 120, md: 180 },
          height: { xs: 120, md: 180 },
          zIndex: 10,
          pointerEvents: "none",
          opacity: 0.5,
          background: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='100%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffd700;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23228b22;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M180 0 L0 0 L180 180 Z' fill='url(%23grad2)' opacity='0.4'/%3E%3Cpath d='M160 20 L140 10 L120 20 L140 30 Z' fill='%23ffd700' opacity='0.6'/%3E%3Cpath d='M130 50 L110 40 L90 50 L110 60 Z' fill='%23228b22' opacity='0.5'/%3E%3Ccircle cx='150' cy='80' r='8' fill='%23ffd700' opacity='0.4'/%3E%3Ccircle cx='80' cy='40' r='6' fill='%23228b22' opacity='0.5'/%3E%3Cpath d='M170 40 Q165 35 160 40 T150 40' stroke='%23ffd700' stroke-width='2' fill='none' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Bottom-left corner decoration */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: { xs: 120, md: 180 },
          height: { xs: 120, md: 180 },
          zIndex: 10,
          pointerEvents: "none",
          opacity: 0.5,
          background: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='100%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' style='stop-color:%23228b22;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ffd700;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0 180 L180 180 L0 0 Z' fill='url(%23grad3)' opacity='0.4'/%3E%3Cpath d='M20 160 L40 150 L60 160 L40 170 Z' fill='%23228b22' opacity='0.6'/%3E%3Cpath d='M50 130 L70 120 L90 130 L70 140 Z' fill='%23ffd700' opacity='0.5'/%3E%3Ccircle cx='30' cy='100' r='8' fill='%23228b22' opacity='0.4'/%3E%3Ccircle cx='100' cy='140' r='6' fill='%23ffd700' opacity='0.5'/%3E%3Cpath d='M10 140 Q15 135 20 140 T30 140' stroke='%23228b22' stroke-width='2' fill='none' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Bottom-right corner decoration */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: { xs: 120, md: 180 },
          height: { xs: 120, md: 180 },
          zIndex: 10,
          pointerEvents: "none",
          opacity: 0.5,
          background: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='100%25' y1='100%25' x2='0%25' y2='0%25'%3E%3Cstop offset='0%25' style='stop-color:%23ffd700;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23228b22;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M180 180 L0 180 L180 0 Z' fill='url(%23grad4)' opacity='0.4'/%3E%3Cpath d='M160 160 L140 150 L120 160 L140 170 Z' fill='%23ffd700' opacity='0.6'/%3E%3Cpath d='M130 130 L110 120 L90 130 L110 140 Z' fill='%23228b22' opacity='0.5'/%3E%3Ccircle cx='150' cy='100' r='8' fill='%23ffd700' opacity='0.4'/%3E%3Ccircle cx='80' cy='140' r='6' fill='%23228b22' opacity='0.5'/%3E%3Cpath d='M170 140 Q165 135 160 140 T150 140' stroke='%23ffd700' stroke-width='2' fill='none' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
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
                    alt={String(post.author.name ?? "")}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </Box>
              )}

              <Typography level="title-md" sx={{ fontWeight: 700, mb: 0.5 }}>
                {String(post.author.name ?? "")}
              </Typography>

              {post.author.period && (
                <Typography
                  level="body-sm"
                  sx={{ color: "var(--cv-textMuted80)", mb: 1 }}
                >
                  {post.author.period}
                </Typography>
              )}

              {/* Genre/Tag */}
              {post.tag && (
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
                    {String(post.tag)
                      .replaceAll("_", " ")
                      .toLowerCase()
                      .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase())}
                  </Typography>
                </Box>
              )}

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
