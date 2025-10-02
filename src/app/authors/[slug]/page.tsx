import { notFound } from "next/navigation";
import { db } from "@/server/db";
import Image from "next/image";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;

  const whereClause = isNaN(Number(slug))
    ? { slug }
    : { OR: [{ slug }, { id: Number(slug) }] };

  const author = await db.author.findFirst({
    where: whereClause,
    include: {
      books: { select: { id: true, title: true, year: true } },
      posts: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          imageBlob: true,
          createdAt: true,
          createdBy: {
            select: { id: true, name: true, image: true, imageBlob: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!author) return notFound();

  return (
    <Box sx={{ py: { xs: 8, md: 14 }, bgcolor: "var(--cv-backgroundDefault)" }}>
      <Box sx={{ maxWidth: 1000, mx: "auto", px: { xs: 3, md: 4 } }}>
        <Card variant="outlined" sx={{ mb: 4, p: { xs: 2, md: 3 } }}>
          <CardContent>
            <Stack spacing={3}>
              <Box
                sx={{
                  position: "relative",
                  width: 120,
                  height: 120,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                {author.image ? (
                  <Image
                    src={String(author.image)}
                    alt={String(author.name ?? "")}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#f0f0f0",
                    }}
                  >
                    <span style={{ color: "var(--cv-neutral500)" }}>
                      {String(author.name ?? "")
                        .slice(0, 1)
                        .toUpperCase()}
                    </span>
                  </Box>
                )}
              </Box>

              <Typography
                level="h3"
                sx={{ fontWeight: 800, fontSize: { xs: "1.6rem", md: "2rem" } }}
              >
                {author.name}
              </Typography>
              {author.period && (
                <Typography
                  level="body-sm"
                  sx={{ color: "var(--cv-textMuted80)" }}
                >
                  {author.period}
                </Typography>
              )}
              {author.bio && (
                <Typography level="body-md">{author.bio}</Typography>
              )}

              {author.posts && author.posts.length > 0 ? (
                <Box>
                  <Typography level="h4" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
                    Posts do autor
                  </Typography>
                  <Stack spacing={3}>
                    {author.posts.map((p) => {
                      const imageSrc: string | undefined = p.image
                        ? String(p.image)
                        : p.imageBlob
                          ? `/api/posts/${p.id}/image`
                          : undefined;

                      const date = p.createdAt
                        ? new Date(p.createdAt).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "";

                      const description = p.description
                        ? String(p.description)
                            .replace(/\r?\n/g, " ")
                            .slice(0, 180)
                        : "";

                      return (
                        <Card
                          key={p.id}
                          variant="outlined"
                          sx={{
                            display: "flex",
                            gap: 3,
                            alignItems: "flex-start",
                            p: { xs: 1.5, md: 2 },
                          }}
                        >
                          {imageSrc ? (
                            <Box
                              sx={{
                                width: { xs: 96, md: 140 },
                                height: { xs: 120, md: 160 },
                                position: "relative",
                                flexShrink: 0,
                                borderRadius: 1,
                                overflow: "hidden",
                              }}
                            >
                              <Image
                                src={imageSrc}
                                alt={p.name}
                                fill
                                style={{ objectFit: "cover" }}
                                unoptimized
                              />
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                width: { xs: 96, md: 140 },
                                height: { xs: 120, md: 160 },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "var(--cv-neutral100)",
                                flexShrink: 0,
                              }}
                            >
                              <span
                                style={{
                                  color: "var(--cv-neutral500)",
                                  fontSize: "1.25rem",
                                }}
                              >
                                {String(p.name ?? "")
                                  .slice(0, 1)
                                  .toUpperCase()}
                              </span>
                            </Box>
                          )}

                          <Box sx={{ flex: 1 }}>
                            <Link
                              href={`/posts/${p.id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Typography
                                level="title-md"
                                sx={{
                                  fontWeight: 800,
                                  mb: 0.5,
                                  fontSize: { xs: "1rem", md: "1.15rem" },
                                }}
                              >
                                {p.name}
                              </Typography>
                            </Link>

                            <Typography
                              level="body-xs"
                              sx={{ color: "var(--cv-textMuted80)", mb: 1 }}
                            >
                              {date} • por {p.createdBy?.name ?? "Desconhecido"}
                            </Typography>

                            {description && (
                              <Typography
                                level="body-sm"
                                sx={{ color: "var(--cv-textMuted70)", mb: 1 }}
                              >
                                {description}
                                {p.description && p.description.length > 180
                                  ? "..."
                                  : ""}
                              </Typography>
                            )}
                          </Box>
                        </Card>
                      );
                    })}
                  </Stack>
                </Box>
              ) : (
                <Box>
                  <Typography level="h4" sx={{ mt: 2, mb: 1 }}>
                    Posts do autor
                  </Typography>
                  <Typography level="body-sm">
                    Nenhum post encontrado
                  </Typography>
                </Box>
              )}

              {author.books && author.books.length > 0 && (
                <Box>
                  <Typography level="h4" sx={{ mt: 2, mb: 1 }}>
                    Livros
                  </Typography>
                  <Stack spacing={1}>
                    {author.books.map((b) => (
                      <Typography key={b.id} level="body-sm">
                        {b.title} {b.year ? `(${b.year})` : ""}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
