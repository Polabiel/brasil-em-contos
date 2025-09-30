"use client";

import Chip from "@mui/joy/Chip";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import Link from "next/link";

type Tag = {
  label: string;
  value?: string; // raw tag value
  color?: "primary" | "success" | "warning" | "danger" | "default";
};

export default function TagsList({
  tags,
  onSelect,
}: {
  tags: Tag[];
  onSelect?: (value: string) => void;
}) {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
      {tags.map((t) => {
        const href = `/?tag=${encodeURIComponent(t.value ?? t.label)}`;
        const chip = (
          <Chip
            key={t.label}
            size="sm"
            variant="soft"
            onClick={() => onSelect && t.value && onSelect(t.value)}
            sx={{
              cursor: onSelect ? "pointer" : undefined,
              fontWeight: 700,
              mr: 0.5,
              mb: 0.5,
            }}
          >
            {t.label}
          </Chip>
        );

        return (
          <Box key={t.label} sx={{ display: "inline-block" }}>
            {onSelect ? (
              chip
            ) : (
              <Link
                href={href}
                scroll={false}
                style={{ textDecoration: "none" }}
              >
                {chip}
              </Link>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}
