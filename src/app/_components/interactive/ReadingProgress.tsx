"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Chip from "@mui/joy/Chip";
import Stack from "@mui/joy/Stack";

interface ReadingProgressProps {
  content: string;
  wordsPerMinute?: number;
}

export function ReadingProgress({
  content,
  wordsPerMinute = 200,
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Calculate reading time
  const wordCount = content.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;

      const scrollProgress = Math.min((scrollTop / documentHeight) * 100, 100);
      setProgress(scrollProgress);

      // Show progress bar when user has scrolled a bit
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        bgcolor: "white",
        borderBottom: "1px solid var(--cv-neutral200)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease",
      }}
    >
      {/* Progress Bar */}
      <Box
        sx={{
          height: 3,
          bgcolor: "var(--cv-neutral100)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            bgcolor: "var(--cv-brazilGreen)",
            width: `${progress}%`,
            transition: "width 0.1s ease",
            background: `linear-gradient(90deg, var(--cv-brazilGreen), var(--cv-brazilYellow))`,
          }}
        />
      </Box>

      {/* Reading Info */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          px: { xs: 2, md: 4 },
          py: 1.5,
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography
            level="body-sm"
            sx={{ color: "var(--cv-textMuted70)", fontWeight: 500 }}
          >
            📖 Brasil em Contos
          </Typography>

          <Chip
            size="sm"
            variant="soft"
            sx={{
              bgcolor: "var(--cv-brazilGreen)10",
              color: "var(--cv-brazilGreen)",
              fontSize: "0.75rem",
            }}
          >
            {Math.round(progress)}% lido
          </Chip>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography level="body-xs" sx={{ color: "var(--cv-textMuted60)" }}>
            ⏱️ {readingTimeMinutes} min de leitura
          </Typography>

          <IconButton
            size="sm"
            variant="plain"
            sx={{
              color: "var(--cv-textMuted60)",
              "&:hover": {
                bgcolor: "var(--cv-brazilGreen)10",
                color: "var(--cv-brazilGreen)",
              },
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <i className="fas fa-arrow-up" style={{ fontSize: "0.8rem" }} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}

interface BookmarkButtonProps {
  postId: number | string;
  initialBookmarked?: boolean;
}

export function BookmarkButton({
  postId: _postId,
  initialBookmarked = false,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleBookmark = () => {
    setIsAnimating(true);
    setIsBookmarked(!isBookmarked);

    // Here you would typically call an API to save/remove bookmark
    // For now, we'll just simulate the action

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <IconButton
      variant={isBookmarked ? "solid" : "outlined"}
      color={isBookmarked ? "warning" : "neutral"}
      size="lg"
      onClick={handleBookmark}
      sx={{
        borderRadius: "50%",
        width: 56,
        height: 56,
        border: isBookmarked ? "none" : "2px solid var(--cv-neutral300)",
        bgcolor: isBookmarked ? "var(--cv-brazilYellow)" : "white",
        color: isBookmarked ? "var(--cv-textPrimary)" : "var(--cv-textMuted70)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        transform: isAnimating ? "scale(1.1)" : "scale(1)",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          bgcolor: isBookmarked ? "#e6c200" : "var(--cv-brazilYellow)20",
          borderColor: isBookmarked
            ? "var(--cv-brazilYellow)"
            : "var(--cv-brazilYellow)",
          color: isBookmarked
            ? "var(--cv-textPrimary)"
            : "var(--cv-brazilYellow)",
        },
      }}
    >
      <i
        className={`fas ${isBookmarked ? "fa-bookmark" : "fa-bookmark"}`}
        style={{ fontSize: "1.2rem" }}
      />
    </IconButton>
  );
}

interface ShareButtonProps {
  title: string;
  url?: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const shareUrl =
    url ?? (typeof window !== "undefined" ? window.location.href : "");
  const shareText = `Leia "${title}" em Brasil em Contos`;

  const handleShare = async (platform: string) => {
    const shareData = {
      title: shareText,
      url: shareUrl,
    };

    if (platform === "native" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        console.log("Native sharing failed, falling back to platform specific");
      }
    }

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (urls[platform as keyof typeof urls]) {
      window.open(
        urls[platform as keyof typeof urls],
        "_blank",
        "width=600,height=400",
      );
    }

    setShowShareMenu(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        variant="outlined"
        size="lg"
        onClick={() => setShowShareMenu(!showShareMenu)}
        sx={{
          borderRadius: "50%",
          width: 56,
          height: 56,
          border: "2px solid var(--cv-neutral300)",
          bgcolor: "white",
          color: "var(--cv-textMuted70)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            bgcolor: "var(--cv-brazilGreen)20",
            borderColor: "var(--cv-brazilGreen)",
            color: "var(--cv-brazilGreen)",
          },
        }}
      >
        <i className="fas fa-share-alt" style={{ fontSize: "1.2rem" }} />
      </IconButton>

      {showShareMenu && (
        <Box
          sx={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            mb: 2,
            bgcolor: "white",
            borderRadius: 8,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            border: "1px solid var(--cv-neutral200)",
            p: 2,
            minWidth: 200,
            zIndex: 10,
            "&::after": {
              content: '""',
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              border: "8px solid transparent",
              borderTopColor: "white",
            },
          }}
        >
          <Stack spacing={1}>
            <Typography
              level="body-sm"
              sx={{ color: "var(--cv-textMuted70)", fontWeight: 600, mb: 1 }}
            >
              Compartilhar
            </Typography>

            {[
              {
                platform: "whatsapp",
                icon: "fab fa-whatsapp",
                label: "WhatsApp",
                color: "#25D366",
              },
              {
                platform: "facebook",
                icon: "fab fa-facebook-f",
                label: "Facebook",
                color: "#1877F2",
              },
              {
                platform: "twitter",
                icon: "fab fa-twitter",
                label: "Twitter",
                color: "#1DA1F2",
              },
              {
                platform: "linkedin",
                icon: "fab fa-linkedin-in",
                label: "LinkedIn",
                color: "#0A66C2",
              },
            ].map((item) => (
              <Box
                key={item.platform}
                component="button"
                onClick={() => handleShare(item.platform)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                  p: 1.5,
                  borderRadius: 6,
                  border: "none",
                  bgcolor: "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: `${item.color}15`,
                  },
                }}
              >
                <i
                  className={item.icon}
                  style={{
                    fontSize: "1.2rem",
                    color: item.color,
                    width: 20,
                    textAlign: "center",
                  }}
                />
                <Typography
                  level="body-sm"
                  sx={{ color: "var(--cv-textMuted80)" }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Click outside to close */}
      {showShareMenu && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 5,
          }}
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </Box>
  );
}

export function FloatingActionButtons({
  postId,
  title,
  _content,
}: {
  postId: number | string;
  title: string;
  _content: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <Stack
      spacing={2}
      sx={{
        position: "fixed",
        right: { xs: 16, md: 24 },
        bottom: { xs: 24, md: 32 },
        zIndex: 100,
        transform: isVisible ? "translateY(0)" : "translateY(100px)",
        opacity: isVisible ? 1 : 0,
        transition: "all 0.3s ease",
      }}
    >
      <BookmarkButton postId={postId} />
      <ShareButton title={title} />

      {/* Back to top */}
      <IconButton
        variant="outlined"
        size="lg"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        sx={{
          borderRadius: "50%",
          width: 56,
          height: 56,
          border: "2px solid var(--cv-neutral300)",
          bgcolor: "white",
          color: "var(--cv-textMuted70)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            bgcolor: "var(--cv-neutral100)",
            borderColor: "var(--cv-textMuted70)",
          },
        }}
      >
        <i className="fas fa-arrow-up" style={{ fontSize: "1.2rem" }} />
      </IconButton>
    </Stack>
  );
}
