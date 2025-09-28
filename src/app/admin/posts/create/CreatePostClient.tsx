"use client";

import { useState } from 'react';
import MDEditorWrapper from '@/app/_components/MDEditorWrapper';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useRouter } from 'next/navigation';


export default function CreatePostClient() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [imageBlobBase64, setImageBlobBase64] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCreate() {
    if (!name.trim()) return;
    setLoading(true);
    try {
      let res: Response;
      if (selectedFile) {
        const fd = new FormData();
        fd.append('name', name);
        fd.append('description', description || '');
        fd.append('content', content || '');
        fd.append('image', image || '');
        fd.append('imageFile', selectedFile, selectedFileName ?? selectedFile.name);
        res = await fetch('/api/admin/posts', { method: 'POST', body: fd });
      } else {
        res = await fetch('/api/admin/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description: description ?? undefined, content: content ?? undefined, image: image ?? undefined, imageBlob: imageBlobBase64 ?? undefined, imageMime: imageMime ?? undefined }),
        });
      }
      if (!res.ok) throw new Error('failed');
      const data = await res.json() as { post: { id: number } };
      router.push(`/admin/posts/${data.post.id}/edit`);
    } catch (err) {
      console.error(err);
      alert('Erro ao criar post');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 6 }}>
      <Stack spacing={2}>
        <Typography level="h4">Criar post</Typography>
        <Input
          placeholder="Título do post"
          value={name}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          autoFocus
        />
        <Input
          placeholder="Descrição curta (opcional)"
          value={description}
          onChange={(e) => setDescription((e.target as HTMLInputElement).value)}
        />
        <Input
          placeholder="URL da imagem (opcional)"
          value={image}
          onChange={(e) => setImage((e.target as HTMLInputElement).value)}
        />

        <Box>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (!file) return;
              setSelectedFileName(file.name);
              setSelectedFile(file);
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result as string;
                const maybeBase64 = result.split(',')[1] ?? null;
                setImageBlobBase64(maybeBase64);
                setImageMime(file.type);
                // preview via data URL
                setImage(result);
              };
              reader.readAsDataURL(file);
            }}
          />
          {selectedFileName && (
            <Typography level="body-sm" sx={{ mt: 1 }}>{selectedFileName}</Typography>
          )}
        </Box>

        <div>
          <Typography sx={{ mb: 1, fontSize: 14 }}>Conteúdo (Markdown)</Typography>
          <div data-color-mode="light">
            <MDEditorWrapper value={content} onChange={(v?: string) => setContent(v ?? '')} height={600} />
          </div>
        </div>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button variant="plain" onClick={() => router.push('/admin/posts')}>Cancelar</Button>
          <Button variant="solid" color="primary" loading={loading} onClick={handleCreate} disabled={!name.trim()}>
            Criar e editar
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
