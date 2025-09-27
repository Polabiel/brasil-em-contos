"use client";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";

export default function Sidebar() {
    return (
     <aside className="w-full md:w-4/4">
     <Card variant="outlined" sx={{ mb: 4, maxWidth: { xs: '100%', md: 320 }, mx: 'auto' }}>
    <CardContent>
     <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--cv-neutral50)' }} />
     </Box>
     <Typography component="h3" sx={{ textAlign: 'center', mb: 1, fontWeight: 700, fontSize: '1rem' }}>A Blogueira</Typography>
     <Typography sx={{ color: 'var(--cv-textMuted80)', textAlign: 'center', fontSize: '0.875rem' }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis sed possimus labore aspernatur, eum nostrum cum qui ex autem enim quae cupiditate.
     </Typography>
    </CardContent>
   </Card>
  </aside>
 );
}
