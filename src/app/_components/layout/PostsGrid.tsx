"use client";

import Grid from "@mui/joy/Grid";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';

export default function PostsGrid({ posts }: { posts: Array<{ id: number; name: string; createdAt?: string; description?: string; image?: string }> }) {
 const { data: session } = useSession();
 const router = useRouter();
 return (
  <Grid container spacing={2} sx={{ mb: 6 }}>
   {posts.map((p) => {
    const date = p.createdAt ? new Date(p.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
   return (
    <Grid xs={12} sm={6} key={p.id}>
     <Link href={`/posts/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card
      variant="outlined"
      sx={{
       position: 'relative',
       transition: 'transform 160ms ease, box-shadow 160ms ease',
       cursor: 'pointer',
       '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 },
      }}
      >
       {session?.user?.role === 'ADMIN' && (
        <IconButton
         aria-label={`Editar post ${p.id}`}
         size="sm"
         variant="outlined"
         sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}
         onClick={(e) => {
          e.stopPropagation();
          router.push(`/admin/posts/${p.id}/edit`);
         }}
        >
         <i className="fas fa-pen" aria-hidden="true" />
        </IconButton>
       )}
       <Box sx={{ width: '100%', height: 140, background: 'var(--cv-neutral50)', borderTopLeftRadius: 6, borderTopRightRadius: 6, overflow: 'hidden' }}>
        {/* image area: show image if available */}
        {p.image ? (
         <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} unoptimized />
         </div>
        ) : (
         <div className="w-full h-full flex items-center justify-center text-sm text-center" style={{ color: 'var(--cv-neutral500)' }}>
          Imagem
         </div>
        )}
       </Box>

       <CardContent>
        <Typography level="title-sm" sx={{ mb: 1 }}>{p.name}</Typography>
        <Typography level="body-xs" sx={{ color: 'var(--cv-textMuted80)', mb: 1 }}>{date}</Typography>
        <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted80)' }}>
         {p.description ?? 'Este é um pequeno resumo do post. Acrescente um trecho real no conteúdo quando disponível.'}
        </Typography>
       </CardContent>
          </Card>
         </Link>
       </Grid>
    );
   })}
  </Grid>
 );
}
