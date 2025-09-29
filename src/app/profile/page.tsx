"use client";

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography level="h2" sx={{ mb: 3 }}>
        Meu Perfil
      </Typography>
      
      <Card variant="outlined">
        <CardContent>
          <Typography level="h4" sx={{ mb: 2 }}>
            {session?.user?.name ?? 'Usuário'}
          </Typography>
          <Typography level="body-md" sx={{ color: 'text.secondary' }}>
            {session?.user?.email ?? 'Email não disponível'}
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Typography level="body-sm">
              Funcionalidades do perfil em desenvolvimento...
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
