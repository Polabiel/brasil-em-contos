"use client";

import { useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Modal from "@mui/joy/Modal";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Divider from "@mui/joy/Divider";
import Image from "next/image";

type AuthorType = {
  id: number;
  name?: string | null;
  period?: string | null;
  bio?: string | null;
  image?: string | null;
  imageBlob?: unknown;
  slug?: string | null;
  books?: { id: number; title: string; year?: number }[] | null;
};

export default function AuthorProfile({ author }: { author: AuthorType | null }) {
  const [open, setOpen] = useState(false);
  if (!author) return null;

  const imageSrc = author.image ?? (author.imageBlob ? `/api/authors/${author.id}/image` : undefined);

  return (
    <>
      <Box
        onClick={() => setOpen(true)}
        sx={{ display: "flex", gap: 2, alignItems: "center", cursor: "pointer" }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(true);
        }}
      >
        {imageSrc ? (
          <Box sx={{ width: 72, height: 72, position: "relative", borderRadius: "50%", overflow: "hidden", flex: "0 0 auto" }}>
            <Image src={imageSrc} alt={String(author.name ?? "Author")} fill style={{ objectFit: "cover" }} unoptimized />
          </Box>
        ) : (
          <Box sx={{ width: 72, height: 72, borderRadius: "50%", background: "var(--cv-neutral100)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
            <span style={{ color: "var(--cv-neutral500)" }}>{String(author.name ?? "").slice(0, 1).toUpperCase()}</span>
          </Box>
        )}

        <Box>
          <Typography level="body-md" sx={{ fontWeight: 600 }}>{String(author.name ?? "")}</Typography>
          {author.period && <Typography level="body-xs" sx={{ color: "var(--cv-textMuted80)" }}>{author.period}</Typography>}
        </Box>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: { xs: '90vw', md: 680 }, maxHeight: '85vh', overflow: 'auto', p: 3, bgcolor: 'var(--cv-backgroundPaper)' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {imageSrc ? (
              <Box sx={{ width: 96, height: 96, position: 'relative', borderRadius: '50%', overflow: 'hidden' }}>
                <Image src={imageSrc} alt={String(author.name ?? '')} fill style={{ objectFit: 'cover' }} unoptimized />
              </Box>
            ) : (
              <Box sx={{ width: 96, height: 96, borderRadius: '50%', background: 'var(--cv-neutral100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--cv-neutral500)', fontSize: 24 }}>{String(author.name ?? '').slice(0, 1).toUpperCase()}</span>
              </Box>
            )}

            <Box>
              <Typography level="h4" sx={{ fontWeight: 700 }}>{String(author.name ?? '')}</Typography>
              {author.period && <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted80)' }}>{author.period}</Typography>}
            </Box>
            <Box sx={{ flex: 1 }} />
            <IconButton aria-label="close" onClick={() => setOpen(false)}>
              ✕
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          {author.bio ? (
            <Typography level="body-lg" sx={{ whiteSpace: 'pre-wrap', color: 'var(--cv-textPrimary)', mb: 2 }}>{author.bio}</Typography>
          ) : (
            <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted80)', mb: 2 }}>Biografia não disponível.</Typography>
          )}

          {author.books && author.books.length > 0 && (
            <>
              <Typography level="body-md" sx={{ fontWeight: 700, mb: 1 }}>Obras</Typography>
              <Box component="ul" sx={{ pl: 3, m: 0 }}>
                {author.books.map((b) => (
                  <Box component="li" key={b.id} sx={{ mb: 1 }}>{b.title}{b.year ? ` (${b.year})` : ''}</Box>
                ))}
              </Box>
            </>
          )}

          <Box sx={{ mt: 3, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => setOpen(false)}>Fechar</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
