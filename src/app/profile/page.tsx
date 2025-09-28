"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
 const [loading, setLoading] = useState(true);
 const [name, setName] = useState('');
 const [image, setImage] = useState('');
 const [localPreview, setLocalPreview] = useState<string | null>(null);
 const [imageBlobBase64, setImageBlobBase64] = useState<string | null>(null);
 const [error, setError] = useState<string | null>(null);
 const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
 const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const router = useRouter();

 useEffect(() => {
  let mounted = true;
  type UserRespOk = { ok: true; user: { name?: string | null; image?: string | null } };
  type UserRespErr = { error: string };
  type UserResp = UserRespOk | UserRespErr;

  fetch('/api/user')
   .then(r => r.json())
   .then((data: unknown) => {
    if (!mounted) return;
    const d = data as UserResp;
    if ('ok' in d && d.ok && d.user) {
     setName(d.user.name ?? '');
     setImage(d.user.image ?? '');
    } else if ('error' in d) {
     setError(d.error ?? 'Failed to load');
    } else {
     setError('Failed to load');
    }
   })
   .catch(() => setError('Failed to load'))
   .finally(() => setLoading(false));
  return () => { mounted = false };
 }, []);

 async function handleSave() {
  setError(null);
  try {
   let res: Response;
   if (selectedFile) {
    const fd = new FormData();
    fd.append('name', name || '');
    fd.append('image', image || '');
    fd.append('avatar', selectedFile, selectedFileName ?? selectedFile.name);
    res = await fetch('/api/user', {
     method: 'PATCH',
     body: fd,
    });
   } else {
    const payload: { name?: string; image?: string; imageBlob?: string; imageMime?: string } = { name, image };
    if (imageBlobBase64) {
     payload.imageBlob = imageBlobBase64;
     const mime = localPreview ? getMimeFromDataUrl(localPreview) : undefined;
     if (mime) payload.imageMime = mime;
    }
    res = await fetch('/api/user', {
     method: 'PATCH',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(payload),
    });
   }
   const patchData = await res.json() as unknown;
   const pd = patchData as { ok?: true; user?: unknown } | { error?: string };
   if ('ok' in pd && pd.ok === true) {
   } else if ('error' in pd && typeof pd.error === 'string') {
    setError(pd.error);
    return;
   } else {
    setError('Update failed');
    return;
   }
   setLocalPreview(null);
   setImageBlobBase64(null);
   setImage('/api/user/image?ts=' + Date.now());
   router.refresh();
  } catch {
   setError('Update failed');
  }
 }

 function getMimeFromDataUrl(dataUrl: string | null) {
  if (!dataUrl) return undefined;
  const re = /^data:([^;]+);base64,/;
  const m = re.exec(dataUrl);
  return m ? m[1] : undefined;
 }

 function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  const f = e.target.files?.[0];
  if (!f) return;
  // Client-side validation
  const MAX_BYTES = 2_000_000; // 2MB
  const allowed = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
  if (!allowed.includes(f.type)) {
   setError('Tipo de imagem não suportado. Use PNG/JPEG/WEBP/GIF.');
   return;
  }
  if (f.size > MAX_BYTES) {
   setError('Imagem muito grande (máx 2MB).');
   return;
  }

  const reader = new FileReader();
  reader.onload = () => {
   const result = reader.result;
   if (typeof result === 'string') {
    setLocalPreview(result);
    const base64 = result.replace(/^data:[^;]+;base64,/, '');
    setImageBlobBase64(base64);
    setSelectedFileName(f.name);
    setSelectedFile(f);
    setError(null);
   }
  };
  reader.readAsDataURL(f);
 }

 if (loading) return (<Box sx={{ p: 6 }}><Typography>Carregando...</Typography></Box>);
 if (error) return (<Box sx={{ p: 6 }}><Typography color="danger">{error}</Typography></Box>);

 return (
  <Box sx={{ maxWidth: 700, mx: 'auto', py: 6 }}>
   <Typography level="h4" sx={{ mb: 2 }}>Meu perfil</Typography>
   <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mb: 3 }}>
    <Box sx={{ width: 72, height: 72, position: 'relative', borderRadius: '50%', overflow: 'hidden' }}>
     {localPreview ? (
      <Image src={localPreview} alt={name ?? 'Avatar'} fill style={{ objectFit: 'cover' }} unoptimized />
     ) : image ? <Image src={image} alt={name ?? 'Avatar'} fill style={{ objectFit: 'cover' }} unoptimized /> : (
      <Box sx={{ width: 72, height: 72, background: 'var(--cv-neutral100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       <span style={{ color: 'var(--cv-neutral500)' }}>{(name ?? '').slice(0, 1).toUpperCase()}</span>
      </Box>
     )}
    </Box>
    <Box sx={{ flex: 1 }}>
     <FormControl>
      <FormLabel>Nome</FormLabel>
      <Input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} fullWidth />
     </FormControl>
     <FormControl sx={{ mt: 2 }}>
      <FormLabel>URL da imagem</FormLabel>
      <Input value={image} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value)} fullWidth />
     </FormControl>
     <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
      <input style={{ display: 'none' }} type="file" accept="image/*" id="avatar-file" onChange={onFileChange} />
      <label htmlFor="avatar-file">
       <Button component="span" variant="outlined" size="sm">Escolher imagem</Button>
      </label>
      {selectedFileName ? (
       <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 14, color: 'var(--cv-neutral700)' }}>{selectedFileName}</span>
        <Button variant="plain" size="sm" onClick={() => { setSelectedFileName(null); setLocalPreview(null); setImageBlobBase64(null); setError(null); }}>Remover</Button>
       </div>
      ) : null}
     </div>
    </Box>
   </Box>

   <Box sx={{ display: 'flex', gap: 2 }}>
    <Button variant="solid" color="primary" onClick={handleSave}>Salvar</Button>
    <Button variant="outlined" onClick={() => router.back()}>Voltar</Button>
   </Box>
  </Box>
 );
}
