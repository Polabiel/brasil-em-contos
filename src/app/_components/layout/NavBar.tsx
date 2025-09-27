"use client";

import { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";

export default function NavBar() {
 const [open, setOpen] = useState(false);
 const menuRef = useRef<HTMLDivElement | null>(null);
 const toggleRef = useRef<HTMLButtonElement | null>(null);
 const { data: session } = useSession();

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
      <IconButton variant="plain" size="sm" aria-label="facebook" onClick={() => alert("Não foi criado ainda")}>
       <i className="fab fa-facebook" />
      </IconButton>
      <IconButton variant="plain" size="sm" aria-label="twitter" onClick={() => alert("Não foi criado ainda")}>
       <i className="fab fa-twitter" />
      </IconButton>
      <IconButton variant="plain" size="sm" aria-label="instagram" onClick={() => alert("Não foi criado ainda")}>
       <i className="fab fa-instagram" />
      </IconButton>

      {session ? (
       <Button variant="outlined" size="sm" sx={{ ml: 1 }} onClick={() => signOut({ callbackUrl: '/' })}>
        Sair
       </Button>
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
      )}
     </Box>
    </Stack>

    <Box
     id="mobile-nav"
     ref={menuRef}
     className="md:hidden"
     role="menu"
     sx={{
      position: 'absolute',
      left: 16,
      top: '100%',
      mt: 1,
      width: 220,
      background: 'var(--cv-backgroundPaper)',
      border: '1px solid var(--cv-neutral500)',
      borderRadius: 1,
      p: 1,
      zIndex: 40,
      boxShadow: 2,
      transition: 'transform 180ms ease, opacity 180ms ease',
      transform: open ? 'translateY(0)' : 'translateY(-6px)',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      display: { md: 'none' },
     }}
     onClick={() => setOpen(false)}
     aria-hidden={!open}
    >
     <div className="flex flex-col gap-2 text-sm">
      <Link href="#" role="menuitem">CONTATO</Link>
      <Link href="#" role="menuitem">EQUIPE</Link>
      <Link href="#" role="menuitem">POSTS IMPORTANTES</Link>
     </div>
    </Box>
   </Box>
   <Divider component={Box} sx={{ height: 2, p: 0 }} />
  </>
 );
}

