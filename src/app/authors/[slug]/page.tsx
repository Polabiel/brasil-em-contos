"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import { api } from "@/trpc/react";

export default function AuthorPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const {
    data: author,
    isLoading,
    error,
  } = api.author.bySlug.useQuery({ slug: slug ?? "" }, { enabled: !!slug });

  return (
    <Box>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          {isLoading ? (
            <Typography level="body-sm">Carregando...</Typography>
          ) : error || !author ? (
            <Typography level="body-sm">Autor não encontrado</Typography>
          ) : (
            <Stack spacing={2}>
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

              <Typography level="h4" sx={{ fontWeight: 700 }}>
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
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
