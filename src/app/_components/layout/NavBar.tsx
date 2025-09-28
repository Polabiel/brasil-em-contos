"use client";

import { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";
import LinkNext from 'next/link';
import Divider from "@mui/joy/Divider";

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
    setAvatarTs(Date.now());
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
      <Box component="nav" sx={{ py: 2, px: 10, position: 'relative' }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ justifyContent: 'space-between', width: '100%' }}>
          <Box className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/icon.webp"
                alt="Brasil em Contos"
                width={40}
                height={40}
                className="cursor-pointer"
              />
            </Link>

            <IconButton
              ref={toggleRef}
              variant="plain"
              size="sm"
              aria-haspopup="true"
              aria-controls="mobile-nav"
              aria-expanded={open}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen(v => !v)}
              className="md:hidden"
              sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            >
              <i className={open ? 'fas fa-times' : 'fas fa-bars'} />
            </IconButton>

            <Box className="hidden md:flex gap-6 text-sm" sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link href="#">CONTATO</Link>
              <Link href="#">EQUIPE</Link>
              <Link href="#">POSTS IMPORTANTES</Link>
            </Box>
          </Box>

          <Box className="flex gap-2">
            {/* hide the top social icons on small screens, they'll be shown inside the mobile menu */}
            <IconButton variant="plain" size="sm" aria-label="facebook" onClick={() => alert("Não foi criado ainda")} sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
              <i className="fab fa-facebook" />
            </IconButton>
            <IconButton variant="plain" size="sm" aria-label="twitter" onClick={() => alert("Não foi criado ainda")} sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
              <i className="fab fa-twitter" />
            </IconButton>
            <IconButton variant="plain" size="sm" aria-label="instagram" onClick={() => alert("Não foi criado ainda")} sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
              <i className="fab fa-instagram" />
            </IconButton>

            {session?.user?.role === 'ADMIN' && (
              <div className="hidden md:flex items-center gap-2">
                <LinkNext href="/admin/posts/create">
                  <Button variant="solid" color="success" size="sm">Criar post</Button>
                </LinkNext>
                <LinkNext href="/admin/posts">
                  <Button variant="outlined" color="warning" size="sm">Gerenciar posts</Button>
                </LinkNext>
              </div>
            )}

            {mounted ? (
              session ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <LinkNext href="/profile">
                    <div style={{ width: 32, height: 32, position: 'relative', borderRadius: 9999, overflow: 'hidden', cursor: 'pointer' }} aria-label="Editar perfil">
                      <Image src={avatarTs ? `/api/user/image?ts=${avatarTs}` : '/api/user/image'} alt={session.user?.name ?? 'Avatar'} width={32} height={32} style={{ objectFit: 'cover' }} unoptimized />
                    </div>
                  </LinkNext>
                  <Button variant="outlined" size="sm" sx={{ ml: 1 }} onClick={() => signOut({ callbackUrl: '/' })}>
                    Sair
                  </Button>
                </div>
              ) : (
                <Button
                  variant="solid"
                  color="primary"
                  size="sm"
                  sx={{ ml: 1 }}
                  onClick={() => signIn(undefined, { callbackUrl: '/' })}
                >
                  Entrar / Cadastrar
                </Button>
              )
            ) : null}
          </Box>
        </Stack>

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
            background: 'var(--cv-backgroundPaper)',
            borderTop: '1px solid var(--cv-neutral500)',
            borderRadius: 0,
            p: 2,
            zIndex: 60,
            boxShadow: 4,
            transformOrigin: 'top center',
            transition: 'transform 320ms cubic-bezier(.16,.84,.24,1), opacity 220ms ease',
            transform: open ? 'translateY(0) scaleY(1)' : 'translateY(-14px) scaleY(0.985)',
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'auto' : 'none',
            display: { md: 'none' },
          }}
          onClick={() => setOpen(false)}
          aria-hidden={!open}
        >
          <div className="flex flex-col gap-3 text-base" style={{ alignItems: 'center', width: '100%' }}>
            {/** staggered items with fade+slide */}
            <LinkNext href="#" role="menuitem" className="w-full">
              <Button fullWidth variant="plain" sx={{ py: 1.5, transition: 'transform 260ms ease, opacity 220ms ease', transform: open ? 'translateY(0)' : 'translateY(-6px)', opacity: open ? 1 : 0 }}>CONTATO</Button>
            </LinkNext>
            <LinkNext href="#" role="menuitem" className="w-full">
              <Button fullWidth variant="plain" sx={{ py: 1.5, transition: 'transform 300ms ease 40ms, opacity 260ms ease 40ms', transform: open ? 'translateY(0)' : 'translateY(-6px)', opacity: open ? 1 : 0 }}>EQUIPE</Button>
            </LinkNext>
            <LinkNext href="#" role="menuitem" className="w-full">
              <Button fullWidth variant="plain" sx={{ py: 1.5, transition: 'transform 340ms ease 80ms, opacity 300ms ease 80ms', transform: open ? 'translateY(0)' : 'translateY(-6px)', opacity: open ? 1 : 0 }}>POSTS IMPORTANTES</Button>
            </LinkNext>
            {session?.user?.role === 'ADMIN' && (
              <>
                <LinkNext href="/admin/posts/create" role="menuitem" className="w-full">
                  <Button fullWidth variant="solid" color="success" sx={{ py: 1.5, backgroundColor: 'var(--joy-palette-success-500)', color: '#fff', '&:hover': { backgroundColor: 'var(--joy-palette-success-600)' }, transition: 'transform 320ms ease 110ms, opacity 280ms ease 110ms', transform: open ? 'translateY(0)' : 'translateY(-6px)', opacity: open ? 1 : 0 }}>Criar post</Button>
                </LinkNext>
                <LinkNext href="/admin/posts" role="menuitem" className="w-full">
                  <Button fullWidth variant="outlined" color="warning" sx={{ py: 1.5, borderColor: 'var(--joy-palette-warning-500)', color: 'var(--joy-palette-warning-700)', '&:hover': { borderColor: 'var(--joy-palette-warning-600)' }, transition: 'transform 360ms ease 140ms, opacity 320ms ease 140ms', transform: open ? 'translateY(0)' : 'translateY(-6px)', opacity: open ? 1 : 0 }}>Gerenciar posts</Button>
                </LinkNext>
              </>
            )}

            {/* social icons shown in the mobile menu for accessibility (bigger targets) */}
            <div className="flex gap-2 mt-1" style={{ justifyContent: 'center' }}>
              <IconButton variant="plain" aria-label="facebook" onClick={() => alert("Não foi criado ainda")} sx={{ width: 48, height: 48 }}>
                <i className="fab fa-facebook" style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton variant="plain" aria-label="twitter" onClick={() => alert("Não foi criado ainda")} sx={{ width: 48, height: 48 }}>
                <i className="fab fa-twitter" style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton variant="plain" aria-label="instagram" onClick={() => alert("Não foi criado ainda")} sx={{ width: 48, height: 48 }}>
                <i className="fab fa-instagram" style={{ fontSize: 20 }} />
              </IconButton>
            </div>
          </div>
        </Box>
      </Box>
      <Divider component={Box} sx={{ height: 2, p: 0 }} />
    </>
  );
}

