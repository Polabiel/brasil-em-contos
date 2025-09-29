"use client";

import Chip from "@mui/joy/Chip";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";

type Tag = {
  label: string;
  color?: "primary" | "success" | "warning" | "danger" | "default";
};

export default function TagsList({ tags }: { tags: Tag[] }) {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
      {tags.map((t) => (
        <Box key={t.label} sx={{ display: 'inline-block' }}>
          <Chip
            size="sm"
            variant="soft"
            sx={{
              bgcolor: `var(--cv-${t.color === 'primary' ? 'brazilGreen' : t.color === 'success' ? 'successMain' : t.color === 'warning' ? 'brazilYellow' : t.color === 'danger' ? 'errorMain' : 'neutral100'})06`,
              color: `var(--cv-${t.color === 'primary' ? 'brazilGreen' : t.color === 'success' ? 'successMain' : t.color === 'warning' ? 'textPrimary' : 'errorMain'})`,
              fontWeight: 700,
              mr: 0.5,
              mb: 0.5,
            }}
          >
            {t.label}
          </Chip>
        </Box>
      ))}
    </Stack>
  );
}
