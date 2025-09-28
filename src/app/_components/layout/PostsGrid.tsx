"use client";

import Grid from "@mui/joy/Grid";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Chip from "@mui/joy/Chip";
import Avatar from "@mui/joy/Avatar";
import Stack from "@mui/joy/Stack";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';

export default function PostsGrid({ posts }: { posts: Array<{ id: number; name: string; createdAt?: string; description?: string; image?: string }> }) {
 const { data: session } = useSession();
 const router = useRouter();
 
 // Mock categories for demonstration - in real app this would come from props
 const getRandomCategory = () => {
   const categories = ['Ficção', 'Crônica', 'Romance', 'Drama', 'Fantasia'];
   return categories[Math.floor(Math.random() * categories.length)];
 };

 const getRandomReadTime = () => {
   const times = ['5 min', '8 min', '12 min', '15 min', '20 min'];
   return times[Math.floor(Math.random() * times.length)];
 };

 return (
   <Box sx={{ mb: 6 }}>
     <Box sx={{ mb: 4, textAlign: 'center' }}>
       <Typography 
         level="h2" 
         sx={{ 
           fontSize: { xs: '1.8rem', md: '2.2rem' },
           fontWeight: 700,
           color: 'var(--cv-textPrimary)',
           mb: 1
         }}
       >
         Últimas Histórias
       </Typography>
       <Typography 
         level="body-lg" 
         sx={{ 
           color: 'var(--cv-textMuted80)',
           maxWidth: 600,
           mx: 'auto',
           lineHeight: 1.6
         }}
       >
         Descubra contos que celebram a diversidade e riqueza da literatura brasileira
       </Typography>
     </Box>

     <Grid container spacing={3}>
       {posts.map((p, index) => {
        const date = p.createdAt ? new Date(p.createdAt).toLocaleDateString('pt-BR', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
        }) : '';
        
        const category = getRandomCategory();
        const readTime = getRandomReadTime();
        const isLarge = index === 0; // Make first post larger

        return (
         <Grid xs={12} sm={6} md={isLarge ? 8 : 4} key={p.id}>
          <Link href={`/posts/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
           <Card
            variant="outlined"
            sx={{
             position: 'relative',
             height: isLarge ? 400 : 320,
             transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
             cursor: 'pointer',
             overflow: 'hidden',
             background: 'var(--cv-backgroundPaper)',
             border: '1px solid var(--cv-neutral200)',
             borderRadius: 12,
             '&:hover': { 
               transform: 'translateY(-8px)',
               boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
               borderColor: 'var(--cv-brazilGreen)',
               '& .post-image': {
                 transform: 'scale(1.05)',
               },
               '& .post-overlay': {
                 opacity: 1,
               },
               '& .read-more': {
                 transform: 'translateY(0)',
                 opacity: 1,
               }
             },
            }}
           >
            {session?.user?.role === 'ADMIN' && (
             <IconButton
              aria-label={`Editar post ${p.id}`}
              size="sm"
              variant="solid"
              color="primary"
              sx={{ 
                position: 'absolute', 
                top: 12, 
                right: 12, 
                zIndex: 3,
                bgcolor: 'var(--cv-brazilGreen)',
                '&:hover': {
                  bgcolor: '#1e5f28',
                }
              }}
              onClick={(e) => {
               e.stopPropagation();
               router.push(`/admin/posts/${p.id}/edit`);
              }}
             >
              <i className="fas fa-pen" aria-hidden="true" />
             </IconButton>
            )}

            {/* Image Section */}
            <Box 
              sx={{ 
                width: '100%', 
                height: isLarge ? 200 : 160, 
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(135deg, var(--cv-brazilGreen)20, var(--cv-brazilYellow)20)`,
              }}
            >
             {p.image ? (
              <Image 
                src={p.image} 
                alt={p.name} 
                fill 
                style={{ objectFit: 'cover' }} 
                className="post-image"
                unoptimized 
              />
             ) : (
              <Box
                className="post-image"
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, var(--cv-brazilGreen)15, var(--cv-brazilYellow)15)`,
                  transition: 'transform 0.3s ease',
                }}
              >
                <Box sx={{ fontSize: isLarge ? '3rem' : '2.5rem', mb: 1 }}>
                  📚
                </Box>
                <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted70)' }}>
                  Conto Brasileiro
                </Typography>
              </Box>
             )}
             
             {/* Overlay for better text readability */}
             <Box
               className="post-overlay"
               sx={{
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 right: 0,
                 bottom: 0,
                 background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
                 opacity: 0,
                 transition: 'opacity 0.3s ease',
               }}
             />

             {/* Category Chip */}
             <Chip
               variant="solid"
               size="sm"
               sx={{
                 position: 'absolute',
                 top: 12,
                 left: 12,
                 bgcolor: 'var(--cv-brazilYellow)',
                 color: 'var(--cv-textPrimary)',
                 fontWeight: 600,
                 fontSize: '0.75rem',
               }}
             >
               {category}
             </Chip>
            </Box>

            <CardContent sx={{ p: isLarge ? 3 : 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
             <Stack spacing={isLarge ? 2 : 1.5} sx={{ flexGrow: 1 }}>
              <Typography 
                level={isLarge ? "h4" : "title-md"} 
                sx={{ 
                  fontWeight: 700,
                  color: 'var(--cv-textPrimary)',
                  lineHeight: 1.3,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {p.name}
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <i className="fas fa-calendar" style={{ color: 'var(--cv-textMuted60)', fontSize: '0.8rem' }} />
                  <Typography level="body-xs" sx={{ color: 'var(--cv-textMuted70)' }}>
                    {date}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <i className="fas fa-clock" style={{ color: 'var(--cv-textMuted60)', fontSize: '0.8rem' }} />
                  <Typography level="body-xs" sx={{ color: 'var(--cv-textMuted70)' }}>
                    {readTime} leitura
                  </Typography>
                </Stack>
              </Stack>

              <Typography 
                level="body-sm" 
                sx={{ 
                  color: 'var(--cv-textMuted80)',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: isLarge ? 3 : 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  flexGrow: 1,
                }}
              >
                {p.description || 'Uma história cativante que explora os aspectos únicos da cultura brasileira através da literatura.'}
              </Typography>

              {/* Read more button - appears on hover */}
              <Stack 
                direction="row" 
                alignItems="center"
                spacing={1}
                className="read-more"
                sx={{
                  transform: 'translateY(8px)',
                  opacity: 0,
                  transition: 'all 0.3s ease',
                  color: 'var(--cv-brazilGreen)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                <span>Ler história</span>
                <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }} />
              </Stack>
             </Stack>
            </CardContent>
           </Card>
          </Link>
         </Grid>
        );
       })}
     </Grid>

     {/* Show more button */}
     {posts.length > 0 && (
       <Box sx={{ textAlign: 'center', mt: 4 }}>
         <Typography level="body-md" sx={{ color: 'var(--cv-textMuted70)', mb: 2 }}>
           Explore mais histórias da literatura brasileira
         </Typography>
         <Box
           component="button"
           sx={{
             bgcolor: 'transparent',
             border: '2px solid var(--cv-brazilGreen)',
             color: 'var(--cv-brazilGreen)',
             px: 4,
             py: 1.5,
             borderRadius: 8,
             fontSize: '1rem',
             fontWeight: 600,
             cursor: 'pointer',
             transition: 'all 0.2s ease',
             '&:hover': {
               bgcolor: 'var(--cv-brazilGreen)',
               color: 'white',
               transform: 'translateY(-2px)',
               boxShadow: '0 4px 12px rgba(34,139,34,0.3)',
             },
           }}
           onClick={() => console.log('Ver mais histórias')}
         >
           <i className="fas fa-plus" style={{ marginRight: 8 }} />
           Ver Mais Contos
         </Box>
       </Box>
     )}
   </Box>
 );
}
