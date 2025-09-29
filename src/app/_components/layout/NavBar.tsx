"use client";

import { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import LinkNext from 'next/link';
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
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
    // set a timestamp only on the client to avoid hydration mismatch
    if (typeof window !== 'undefined') {
      setAvatarTs(Date.now());
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    function onDocClick(e: MouseEvent) {
      const target = e.target as Node | null;
      if (!menuRef.current) return;
      if (!menuRef.current.contains(target) && !toggleRef.current?.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onDocClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onDocClick);
    };
  }, [open]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (!open) {
      toggleRef.current?.focus();
      return;
    }

    const root = menuRef.current;
    if (!root) return;

    const focusable = Array.from(
      root.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])')
    ).filter(Boolean);

    if (focusable.length > 0 && focusable[0]) focusable[0].focus();

    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
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

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <Box 
        component="nav" 
        sx={{ 
          py: 2, 
          px: { xs: 2, md: 4 }, 
          position: 'relative',
          bgcolor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          borderBottom: '1px solid var(--cv-neutral200)',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ justifyContent: 'space-between', width: '100%' }}>
          
          {/* Logo and Brand */}
          <Box className="flex items-center gap-4">
            {/* Mobile menu button on the left near the logo */}
            <IconButton
              ref={toggleRef}
              variant="soft"
              size="sm"
              aria-haspopup="true"
              aria-controls="mobile-nav"
              aria-expanded={open}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen(v => !v)}
              sx={{ 
                display: { xs: 'inline-flex', md: 'none' },
                bgcolor: open ? 'var(--cv-brazilGreen)15' : 'transparent',
                color: open ? 'var(--cv-brazilGreen)' : 'var(--cv-textMuted80)',
                mr: 1,
                '&:hover': {
                  bgcolor: 'var(--cv-brazilGreen)10',
                  color: 'var(--cv-brazilGreen)'
                }
              }}
            >
              <i className={open ? 'fas fa-times' : 'fas fa-bars'} />
            </IconButton>
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
                    fontWeight: 600,
                    color: 'var(--cv-textPrimary)',
                    fontSize: { xs: '0.95rem', sm: '1.4rem' },
                    lineHeight: 1,
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  Brasil em <Box component="span" sx={{ color: 'var(--cv-brazilGreen)' }}>Contos</Box>
                </Typography>
                {/* Compact title for very small screens (BeC) */}
                <Typography
                  level="body-sm"
                  sx={{
                    display: { xs: 'block', sm: 'none' },
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: 'var(--cv-textPrimary)',
                    letterSpacing: '0.02em'
                  }}
                >
                  Be<Box component="span" sx={{ color: 'var(--cv-brazilGreen)', ml: 0.3 }}>C</Box>
                </Typography>
                <Typography 
                  level="body-xs" 
                  sx={{ 
                    color: 'var(--cv-textMuted70)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.05em',
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  LITERATURA BRASILEIRA
                </Typography>
              </Stack>
            </Link>
            

            {/* left box intentionally contains only logo/brand */}
          </Box>

          {/* Right side actions */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            
            
            {/* Admin buttons for desktop */}
            {session?.user?.role === 'ADMIN' && (
              <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                <LinkNext href="/admin/posts/create">
                  <Button 
                    variant="solid" 
                    color="success" 
                    size="sm"
                    sx={{
                      bgcolor: 'var(--cv-brazilGreen)',
                      '&:hover': { bgcolor: '#1e5f28' }
                    }}
                  >
                    <i className="fas fa-plus" style={{ marginRight: 6, fontSize: '0.8rem' }} />
                    Criar
                  </Button>
                </LinkNext>
                <LinkNext href="/admin/posts">
                  <Button variant="outlined" color="warning" size="sm">
                    <i className="fas fa-cog" style={{ marginRight: 6, fontSize: '0.8rem' }} />
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
                        position: 'relative', 
                        borderRadius: '50%', 
                        overflow: 'hidden', 
                        cursor: 'pointer',
                        border: '2px solid var(--cv-brazilGreen)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: 'var(--cv-brazilYellow)',
                          transform: 'scale(1.05)',
                        }
                      }} 
                      aria-label="Editar perfil"
                    >
                      <Image 
                        src={avatarTs ? `/api/user/image?ts=${avatarTs}` : '/api/user/image'} 
                        alt={session.user?.name ?? 'Avatar'} 
                        width={32} 
                        height={32} 
                        style={{ objectFit: 'cover' }} 
                        unoptimized 
                      />
                    </Box>
                  </LinkNext>
                  
                  <Button 
                    variant="outlined" 
                    size="sm" 
                    sx={{ 
                      borderColor: 'var(--cv-neutral300)',
                      color: 'var(--cv-textMuted80)',
                      '&:hover': {
                        borderColor: 'var(--cv-brazilGreen)',
                        color: 'var(--cv-brazilGreen)',
                      }
                    }}
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    <i className="fas fa-sign-out-alt" style={{ marginRight: 6, fontSize: '0.8rem' }} />
                    Sair
                  </Button>
                </Stack>
              ) : (
                <Button
                  variant="solid"
                  size="sm"
                  sx={{
                    bgcolor: 'var(--cv-brazilGreen)',
                    color: 'white',
                    px: 3,
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: '#1e5f28',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 8px rgba(34,139,34,0.3)',
                    }
                  }}
                  onClick={() => signIn(undefined, { callbackUrl: '/' })}
                >
                  <i className="fas fa-user" style={{ marginRight: 6, fontSize: '0.8rem' }} />
                  Entrar
                </Button>
              )
            ) : null}
          </Stack>
        </Stack>
          {/* Centered Desktop Navigation */}
          <Stack 
            direction="row" 
            spacing={4} 
            alignItems="center"
            sx={{ display: { xs: 'none', md: 'flex' }, mx: 'auto' }}
          >
            <Link href="/contos" style={{ textDecoration: 'none' }}>
              <Typography level="body-md" sx={{ color: 'var(--cv-textMuted80)', fontWeight: 500, fontSize: '0.95rem', px: 1 }}>
                Contos
              </Typography>
            </Link>

            <Link href="/autores" style={{ textDecoration: 'none' }}>
              <Typography level="body-md" sx={{ color: 'var(--cv-textMuted80)', fontWeight: 500, fontSize: '0.95rem', px: 1 }}>
                Autores
              </Typography>
            </Link>

            <Link href="/categorias" style={{ textDecoration: 'none' }}>
              <Typography level="body-md" sx={{ color: 'var(--cv-textMuted80)', fontWeight: 500, fontSize: '0.95rem', px: 1 }}>
                Categorias
              </Typography>
            </Link>

            <Link href="/sobre" style={{ textDecoration: 'none' }}>
              <Typography level="body-md" sx={{ color: 'var(--cv-textMuted80)', fontWeight: 500, fontSize: '0.95rem', px: 1 }}>
                Sobre
              </Typography>
            </Link>
          </Stack>
        {/* Mobile Navigation Menu */}
        <Box
          id="mobile-nav"
          ref={menuRef}
          className="md:hidden"
          role="menu"
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '100%',
            mt: 1,
            width: '100%',
            background: 'white',
            border: '1px solid var(--cv-neutral200)',
            borderRadius: 8,
            p: 3,
            zIndex: 60,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            transformOrigin: 'top center',
            transition: 'all 300ms cubic-bezier(.16,.84,.24,1)',
            transform: open ? 'translateY(0) scaleY(1)' : 'translateY(-8px) scaleY(0.98)',
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'auto' : 'none',
            display: { md: 'none' },
          }}
          onClick={() => setOpen(false)}
          aria-hidden={!open}
        >
          <Stack spacing={2}>
            {/* Navigation Links */}
            <Stack spacing={1}>
              {[
                { label: 'Contos', href: '/contos', icon: 'fas fa-book' },
                { label: 'Autores', href: '/autores', icon: 'fas fa-user-pen' },
                { label: 'Categorias', href: '/categorias', icon: 'fas fa-tags' },
                { label: 'Sobre', href: '/sobre', icon: 'fas fa-info-circle' },
              ].map((link) => (
                <LinkNext key={link.label} href={link.href} role="menuitem">
                  <Button 
                    fullWidth 
                    variant="plain" 
                    sx={{ 
                      py: 1.5,
                      justifyContent: 'flex-start',
                      color: 'var(--cv-textMuted80)',
                      '&:hover': {
                        bgcolor: 'var(--cv-brazilGreen)10',
                        color: 'var(--cv-brazilGreen)',
                      }
                    }}
                  >
                    <i className={link.icon} style={{ marginRight: 12, width: 16 }} />
                    {link.label}
                  </Button>
                </LinkNext>
              ))}
            </Stack>

            {/* Admin actions for mobile */}
            {session?.user?.role === 'ADMIN' && (
              <>
                <Divider sx={{ my: 1 }} />
                <Stack spacing={1}>
                  <LinkNext href="/admin/posts/create" role="menuitem">
                    <Button 
                      fullWidth 
                      variant="solid" 
                      sx={{
                        py: 1.5,
                        bgcolor: 'var(--cv-brazilGreen)',
                        '&:hover': { bgcolor: '#1e5f28' }
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
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted70)', mb: 2 }}>
                Siga-nos nas redes sociais
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="center">
                {[
                  { icon: 'fab fa-facebook-f', label: 'Facebook' },
                  { icon: 'fab fa-twitter', label: 'Twitter' },
                  { icon: 'fab fa-instagram', label: 'Instagram' },
                ].map((social) => (
                  <IconButton
                    key={social.label}
                    variant="soft"
                    aria-label={social.label}
                    sx={{
                      bgcolor: 'var(--cv-neutral100)',
                      color: 'var(--cv-textMuted70)',
                      '&:hover': {
                        bgcolor: 'var(--cv-brazilGreen)',
                        color: 'white',
                      }
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