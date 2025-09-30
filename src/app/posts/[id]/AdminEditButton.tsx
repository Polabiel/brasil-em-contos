"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import IconButton from "@mui/joy/IconButton";

interface AdminEditButtonProps {
  postId: number;
}

export default function AdminEditButton({ postId }: AdminEditButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();

  // Only show for admins
  if (session?.user?.role !== "ADMIN") {
    return null;
  }

  return (
    <IconButton
      aria-label={`Editar post ${postId}`}
      size="sm"
      variant="outlined"
      sx={{
        bgcolor: "transparent",
        borderColor: "var(--cv-brazilGreen)",
        color: "var(--cv-brazilGreen)",
        width: 40,
        height: 40,
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: "var(--cv-brazilGreen)",
          color: "white",
          transform: "translateY(-1px)",
        },
      }}
      onClick={() => {
        router.push(`/admin/posts/${postId}/edit`);
      }}
    >
      <i className="fas fa-pen" style={{ fontSize: "0.9rem" }} aria-hidden="true" />
    </IconButton>
  );
}