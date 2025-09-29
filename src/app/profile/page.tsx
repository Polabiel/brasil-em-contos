"use client";

import { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Avatar from '@mui/joy/Avatar';
// ...existing imports
import { useSession } from 'next-auth/react';
import { api } from '@/trpc/react';
import UploadButton from '@/app/_components/ui/UploadButton';
import { useRouter } from 'next/navigation';
import { useToast } from '@/app/_components/ui/ToastProvider';

type UserPayload = { id: string; name: string | null; email: string | null; image: string | null };

export default function ProfilePage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserPayload | null>(null);
  const [name, setName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const utils = api.useContext();
  const { data: me } = api.user.me.useQuery();
  const updateUser = api.user.update.useMutation({
    onSuccess() {
      void utils.user.me.invalidate();
    },
  });
  const toast = useToast();

  useEffect(() => {
    if (!me) return;
    setUser(me as UserPayload);
    setName(me.name ?? '');
    setImageUrl(me.image ?? '');
    setPreview(me.image ?? null);
  }, [me]);

  useEffect(() => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  }, [selectedFile]);

  // update preview when user types an image URL (only when no file is selected)
  useEffect(() => {
    if (selectedFile) return; // prefer local file preview
    setPreview(imageUrl ?? null);
  }, [imageUrl, selectedFile]);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography level="h2" sx={{ mb: 3 }}>
        Meu Perfil
      </Typography>
      
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Avatar
                src={preview ?? undefined}
                alt={session?.user?.name ?? 'Avatar'}
                size="lg"
                variant="soft"
              />
              <Box>
                <Typography level="h4">{user?.name ?? session?.user?.name ?? 'Usuário'}</Typography>
                <Typography level="body-sm" sx={{ color: 'text.secondary' }}>{user?.email ?? session?.user?.email ?? 'Email não disponível'}</Typography>
              </Box>
            </Box>

            <Input placeholder="Nome" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} />
            <Input placeholder="URL da imagem (opcional)" value={imageUrl} onChange={(e) => setImageUrl((e.target as HTMLInputElement).value)} />

            <UploadButton
              buttonLabel="Escolher arquivo"
              onChange={(e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (!file) return;
                setSelectedFile(file);
              }}
            />

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button variant="plain" onClick={() => router.back()}>Voltar</Button>
              <Button
                variant="solid"
                color="primary"
                loading={saving}
                onClick={async () => {
                  if (saving) return;
                  setSaving(true);
                  try {
                    if (selectedFile) {
                      const fd = new FormData();
                      fd.append('name', name);
                      fd.append('image', imageUrl || '');
                      fd.append('avatar', selectedFile, selectedFile.name);
                      const res = await fetch('/api/user', { method: 'PATCH', body: fd });
                      if (!res.ok) {
                        const txt = await res.text().catch(() => '');
                        throw new Error(`Erro ao salvar: ${res.status} ${txt}`);
                      }
                      // invalidate the tRPC cache so UI updates
                      await utils.user.me.invalidate();
                      // notify NavBar to refresh avatar
                      window.dispatchEvent(new Event('avatarUpdated'));
                      toast.push('Perfil atualizado com sucesso', 'success');
                    } else {
                      // use tRPC for the JSON flow and wait for completion
                      await updateUser.mutateAsync({ name, image: imageUrl });
                      // ensure cache invalidated (mutation onSuccess already invalidates, but be explicit)
                      await utils.user.me.invalidate();
                      window.dispatchEvent(new Event('avatarUpdated'));
                      toast.push('Perfil atualizado com sucesso', 'success');
                    }
                  } catch (err) {
                    console.error(err);
                    toast.push('Erro ao atualizar perfil', 'danger');
                  } finally {
                    setSaving(false);
                  }
                }}
              >
                Salvar
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
