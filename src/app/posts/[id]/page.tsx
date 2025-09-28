import { notFound } from 'next/navigation';
import { db } from '@/server/db';
import Image from 'next/image';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import PostContentClient from '../PostContentClient';

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
 const { id: idParam } = await params;
 const id = Number(idParam);
 if (Number.isNaN(id)) return notFound();

 const post = await db.post.findUnique({ where: { id }, select: { id: true, name: true, content: true, description: true, image: true, imageBlob: true, createdAt: true, createdBy: { select: { id: true, name: true, image: true } } } });
 if (!post) return notFound();
 const date = post.createdAt ? new Date(post.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : '';

 const imageSrc: string | undefined = post.image ? String(post.image) : post.imageBlob ? `/api/posts/${post.id}/image` : undefined;

 return (
  <Box sx={{ maxWidth: 1000, mx: 'auto', py: 6 }}>
   <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 4, alignItems: 'start' }}>
    <Box>
     {imageSrc && (
      <Box sx={{ width: '100%', height: 360, mb: 3, position: 'relative' }}>
       <Image src={imageSrc} alt={post.name} fill style={{ objectFit: 'cover' }} unoptimized />
      </Box>
     )}
     <Typography level="h3" sx={{ mb: 1 }}>{post.name}</Typography>
     <Typography level="body-xs" sx={{ color: 'var(--cv-textMuted80)', mb: 3 }}>{date}</Typography>
     <PostContentClient content={String(post.content ?? '')} />
    </Box>

    <Box sx={{ borderLeft: '1px solid rgba(0,0,0,0.04)', pl: 3 }}>
     <Typography level="body-md" sx={{ mb: 2, fontWeight: 700 }}>Autor</Typography>
     {(() => {
      const author = post.createdBy as { id: string; name?: string | null; image?: string | null } | null;
      if (!author) return (<Typography level="body-sm" sx={{ color: 'var(--cv-textMuted80)' }}>Autor desconhecido</Typography>);
      return (
       <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {author.image ? (
         <Box sx={{ width: 72, height: 72, position: 'relative', borderRadius: '50%', overflow: 'hidden' }}>
          <Image src={String(author.image)} alt={String(author.name ?? '')} fill style={{ objectFit: 'cover' }} unoptimized />
         </Box>
        ) : (
         <Box sx={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--cv-neutral100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'var(--cv-neutral500)' }}>{String(author.name ?? '').slice(0, 1).toUpperCase()}</span>
         </Box>
        )}
        <Box>
         <Typography level="body-md" sx={{ fontWeight: 600 }}>{String(author.name ?? '')}</Typography>
        </Box>
       </Box>
      );
     })()}
    </Box>
   </Box>
  </Box>
 );
}
