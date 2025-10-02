"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import LinkNext from "next/link";
import Divider from "@mui/joy/Divider";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [avatarTs, setAvatarTs] = useState<number | null>(null);
  const [showNav, setShowNav] = useState(true);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const { data: session } = useSession();

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setAvatarTs(Date.now());
    }
    function onAvatarUpdated() {
      setAvatarTs(Date.now());
    }
    if (typeof window !== "undefined") {
      window.addEventListener("avatarUpdated", onAvatarUpdated);
    }
    return () => {
      if (typeof window !== "undefined")
        window.removeEventListener("avatarUpdated", onAvatarUpdated);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    function onDocClick(e: MouseEvent) {
      const target = e.target as Node | null;
      if (!menuRef.current) return;
      if (
        !menuRef.current.contains(target) &&
        !toggleRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
    };
  }, [open]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function onScroll() {
      const currentY = window.scrollY || window.pageYOffset;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const delta = currentY - lastScrollY.current;

          if (Math.abs(delta) > 10) {
            if (delta > 0 && currentY > 80) {
              setShowNav(false);
            } else {
              setShowNav(true);
            }
            lastScrollY.current = currentY;
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!open) {
      toggleRef.current?.focus();
      return;
    }

    const root = menuRef.current;
    if (!root) return;

    const focusable = Array.from(
      root.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter(Boolean);

    if (focusable.length > 0 && focusable[0]) focusable[0].focus();

    function onKey(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const active = document.activeElement as HTMLElement;
      const idx = focusable.indexOf(active);
      if (e.shiftKey) {
        if (idx === 0) {
          e.preventDefault();
          const last = focusable[focusable.length - 1];
          if (last) last.focus();
        }
      } else {
        if (idx === focusable.length - 1) {
          e.preventDefault();
          const first = focusable[0];
          if (first) first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Box
        component="nav"
        sx={{
          py: 2,
          px: { xs: 2, md: 4 },
          position: "sticky",
          top: 0,
          zIndex: 60,
          bgcolor: "white",
          boxShadow: showNav 
            ? "0 4px 16px rgba(34,139,34,0.08)" 
            : "none",
          borderBottom: showNav 
            ? "2px solid transparent"
            : "1px solid var(--cv-neutral200)",
          borderImage: showNav 
            ? "linear-gradient(90deg, var(--cv-brazilGreen), var(--cv-brazilYellow), var(--cv-brazilBlue)) 1"
            : "none",
          transform: showNav ? "translateY(0)" : "translateY(-110%)",
          transition:
            "all 350ms cubic-bezier(.2,.8,.2,1)",
          backdropFilter: "blur(10px)",
          background: showNav 
            ? "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)"
            : "white",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            justifyContent: "space-between",
            width: "100%",
            position: "relative",
          }}
        >
          {/* Left side - Desktop navigation + Mobile menu button */}
          <Box
            sx={{
              flex: "1 1 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {/* Mobile menu button */}
            <IconButton
              ref={toggleRef}
              variant="soft"
              size="sm"
              aria-haspopup="true"
              aria-controls="mobile-nav"
              aria-expanded={open}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                bgcolor: open ? "var(--cv-brazilGreen)15" : "transparent",
                color: open ? "var(--cv-brazilGreen)" : "var(--cv-textMuted80)",
                mr: 2,
                "&:hover": {
                  bgcolor: "var(--cv-brazilGreen)10",
                  color: "var(--cv-brazilGreen)",
                },
              }}
            >
              <i className={open ? "fas fa-times" : "fas fa-bars"} />
            </IconButton>

            {/* Desktop Navigation */}
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Link href="/contos" style={{ textDecoration: "none" }}>
                <Typography
                  level="body-md"
                  sx={{
                    color: "var(--cv-textMuted80)",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    position: "relative",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%) scaleX(0)",
                      width: "80%",
                      height: "3px",
                      bgcolor: "var(--cv-brazilGreen)",
                      borderRadius: "2px",
                      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    },
                    "&:hover": {
                      color: "var(--cv-brazilGreen)",
                      bgcolor: "var(--cv-brazilGreen)08",
                      transform: "translateY(-2px)",
                      "&::after": {
                        transform: "translateX(-50%) scaleX(1)",
                      },
                    },
                  }}
                >
                  Contos
                </Typography>
              </Link>

              <Link href="/autores" style={{ textDecoration: "none" }}>
                <Typography
                  level="body-md"
                  sx={{
                    color: "var(--cv-textMuted80)",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    position: "relative",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%) scaleX(0)",
                      width: "80%",
                      height: "3px",
                      bgcolor: "var(--cv-brazilYellow)",
                      borderRadius: "2px",
                      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    },
                    "&:hover": {
                      color: "var(--cv-brazilYellow)",
                      bgcolor: "var(--cv-brazilYellow)15",
                      transform: "translateY(-2px)",
                      "&::after": {
                        transform: "translateX(-50%) scaleX(1)",
                      },
                    },
                  }}
                >
                  Autores
                </Typography>
              </Link>

              <Link href="/sobre" style={{ textDecoration: "none" }}>
                <Typography
                  level="body-md"
                  sx={{
                    color: "var(--cv-textMuted80)",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    position: "relative",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%) scaleX(0)",
                      width: "80%",
                      height: "3px",
                      bgcolor: "var(--cv-brazilBlue)",
                      borderRadius: "2px",
                      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    },
                    "&:hover": {
                      color: "var(--cv-brazilBlue)",
                      bgcolor: "var(--cv-brazilBlue)10",
                      transform: "translateY(-2px)",
                      "&::after": {
                        transform: "translateX(-50%) scaleX(1)",
                      },
                    },
                  }}
                >
                  Sobre
                </Typography>
              </Link>
            </Stack>
          </Box>

          {/* Center - Logo and Brand */}
          <Box
            sx={{
              flex: "0 0 auto",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/icon.webp"
                alt="Brasil em Contos"
                width={44}
                height={44}
                className="cursor-pointer"
              />
              <Stack spacing={0} sx={{ ml: { xs: 1, sm: 0 } }}>
                {/* Desktop / tablet title */}
                <Typography
                  className={playfair.className}
                  level="h4"
                  sx={{
                    fontWeight: 700,
                    background: "linear-gradient(135deg, var(--cv-brazilGreen) 0%, var(--cv-brazilYellow) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: { xs: "0.95rem", sm: "1.4rem" },
                    lineHeight: 1,
                    display: { xs: "none", sm: "block" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  Brasil em{" "}
                  <Box component="span" sx={{ 
                    background: "linear-gradient(135deg, var(--cv-brazilBlue) 0%, var(--cv-brazilGreen) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    Contos
                  </Box>
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{
                    color: "var(--cv-textMuted70)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.05em",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  LITERATURA BRASILEIRA
                </Typography>
              </Stack>
            </Link>
          </Box>

          {/* Right side actions */}
          <Box
            sx={{
              flex: "1 1 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              {/* Admin buttons for desktop */}
              {session?.user?.role === "ADMIN" && (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  <LinkNext href="/admin/posts/create">
                    <Button
                      variant="solid"
                      color="success"
                      size="sm"
                      sx={{
                        bgcolor: "var(--cv-brazilGreen)",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                          transition: "left 0.5s ease",
                        },
                        "&:hover": { 
                          bgcolor: "#1e5f28",
                          transform: "translateY(-2px) scale(1.05)",
                          boxShadow: "0 6px 20px rgba(34,139,34,0.4)",
                          "&::before": {
                            left: "100%",
                          },
                        },
                      }}
                    >
                      <i
                        className="fas fa-plus"
                        style={{ marginRight: 6, fontSize: "0.8rem" }}
                      />
                      Criar
                    </Button>
                  </LinkNext>
                  <LinkNext href="/admin/posts">
                    <Button 
                      variant="outlined" 
                      color="warning" 
                      size="sm"
                      sx={{
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          transform: "translateY(-2px) scale(1.05)",
                          boxShadow: "0 6px 20px rgba(245,158,11,0.3)",
                        },
                      }}
                    >
                      <i
                        className="fas fa-cog"
                        style={{ marginRight: 6, fontSize: "0.8rem" }}
                      />
                      Gerenciar
                    </Button>
                  </LinkNext>
                </Stack>
              )}

              {/* User Authentication */}
              {mounted ? (
                session ? (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LinkNext href="/profile">
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          position: "relative",
                          borderRadius: "50%",
                          overflow: "hidden",
                          cursor: "pointer",
                          border: "2px solid var(--cv-brazilGreen)",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            borderColor: "var(--cv-brazilYellow)",
                            transform: "scale(1.05)",
                          },
                        }}
                        aria-label="Editar perfil"
                      >
                        <Image
                          src={
                            avatarTs
                              ? `/api/user/image?ts=${avatarTs}`
                              : "/api/user/image"
                          }
                          alt={session.user?.name ?? "Avatar"}
                          width={32}
                          height={32}
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      </Box>
                    </LinkNext>

                    <Button
                      variant="outlined"
                      size="sm"
                      sx={{
                        borderColor: "var(--cv-neutral300)",
                        color: "var(--cv-textMuted80)",
                        "&:hover": {
                          borderColor: "var(--cv-brazilGreen)",
                          color: "var(--cv-brazilGreen)",
                        },
                      }}
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <i
                        className="fas fa-sign-out-alt"
                        style={{ marginRight: 6, fontSize: "0.8rem" }}
                      />
                      Sair
                    </Button>
                  </Stack>
                ) : (
                  <Button
                    variant="solid"
                    size="sm"
                    sx={{
                      bgcolor: "var(--cv-brazilGreen)",
                      color: "white",
                      px: 3,
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: "#1e5f28",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 8px rgba(34,139,34,0.3)",
                      },
                    }}
                    onClick={() => signIn(undefined, { callbackUrl: "/" })}
                  >
                    <i
                      className="fas fa-user"
                      style={{ marginRight: 6, fontSize: "0.8rem" }}
                    />
                    Entrar
                  </Button>
                )
              ) : null}
            </Stack>
          </Box>
        </Stack>
        {/* Mobile Navigation Menu */}
        <Box
          id="mobile-nav"
          ref={menuRef}
          className="md:hidden"
          role="menu"
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "100%",
            mt: 1,
            width: "100%",
            background: "white",
            border: "1px solid var(--cv-neutral200)",
            borderRadius: 8,
            p: 3,
            zIndex: 60,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            transformOrigin: "top center",
            transition: "all 300ms cubic-bezier(.16,.84,.24,1)",
            transform: open
              ? "translateY(0) scaleY(1)"
              : "translateY(-8px) scaleY(0.98)",
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
            display: { md: "none" },
          }}
          onClick={() => setOpen(false)}
          aria-hidden={!open}
        >
          <Stack spacing={2}>
            {/* Navigation Links */}
            <Stack spacing={1}>
              {[
                { label: "Contos", href: "/contos", icon: "fas fa-book" },
                { label: "Autores", href: "/autores", icon: "fas fa-user-pen" },
                { label: "Sobre", href: "/sobre", icon: "fas fa-info-circle" },
              ].map((link) => (
                <LinkNext key={link.label} href={link.href} role="menuitem">
                  <Button
                    fullWidth
                    variant="plain"
                    sx={{
                      py: 1.5,
                      justifyContent: "flex-start",
                      color: "var(--cv-textMuted80)",
                      "&:hover": {
                        bgcolor: "var(--cv-brazilGreen)10",
                        color: "var(--cv-brazilGreen)",
                      },
                    }}
                  >
                    <i
                      className={link.icon}
                      style={{ marginRight: 12, width: 16 }}
                    />
                    {link.label}
                  </Button>
                </LinkNext>
              ))}
            </Stack>

            {/* Admin actions for mobile */}
            {session?.user?.role === "ADMIN" && (
              <>
                <Divider sx={{ my: 1 }} />
                <Stack spacing={1}>
                  <LinkNext href="/admin/posts/create" role="menuitem">
                    <Button
                      fullWidth
                      variant="solid"
                      sx={{
                        py: 1.5,
                        bgcolor: "var(--cv-brazilGreen)",
                        "&:hover": { bgcolor: "#1e5f28" },
                      }}
                    >
                      <i className="fas fa-plus" style={{ marginRight: 8 }} />
                      Criar Post
                    </Button>
                  </LinkNext>
                  <LinkNext href="/admin/posts" role="menuitem">
                    <Button
                      fullWidth
                      variant="outlined"
                      color="warning"
                      sx={{ py: 1.5 }}
                    >
                      <i className="fas fa-cog" style={{ marginRight: 8 }} />
                      Gerenciar Posts
                    </Button>
                  </LinkNext>
                </Stack>
              </>
            )}

            <Divider sx={{ my: 1 }} />

            {/* Contact info */}
            <Box sx={{ textAlign: "center", py: 2 }}>
              <Typography
                level="body-sm"
                sx={{ color: "var(--cv-textMuted70)", mb: 2 }}
              >
                Siga-nos nas redes sociais
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="center">
                {[
                  { icon: "fab fa-facebook-f", label: "Facebook" },
                  { icon: "fab fa-twitter", label: "Twitter" },
                  { icon: "fab fa-instagram", label: "Instagram" },
                ].map((social) => (
                  <IconButton
                    key={social.label}
                    variant="soft"
                    aria-label={social.label}
                    sx={{
                      bgcolor: "var(--cv-neutral100)",
                      color: "var(--cv-textMuted70)",
                      "&:hover": {
                        bgcolor: "var(--cv-brazilGreen)",
                        color: "white",
                      },
                    }}
                    onClick={() => console.log(`${social.label} clicked`)}
                  >
                    <i className={social.icon} />
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
