"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Chip from '@mui/joy/Chip';
import Avatar from '@mui/joy/Avatar';
import CircularProgress from '@mui/joy/CircularProgress';
import { useRouter } from 'next/navigation';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

// Tipos para as respostas da API
type UserRespOk = { 
  ok: true; 
  user: { name?: string | null; image?: string | null } 
};
type UserRespErr = { error: string };
type UserResp = UserRespOk | UserRespErr;

type UpdateResponse = { 
  ok?: true; 
  user?: unknown 
} | { 
  error?: string 
};

export default function ProfilePage() {
  // Estados do componente
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [imageBlobBase64, setImageBlobBase64] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  // Carrega os dados do usuário ao montar o componente
  useEffect(() => {
    let mounted = true;

    const loadUserData = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json() as UserResp;
        
        if (!mounted) return;
        
        if ('ok' in data && data.ok && data.user) {
          setName(data.user.name ?? '');
          setImage(data.user.image ?? '');
        } else if ('error' in data) {
          setError(data.error ?? 'Falha ao carregar dados');
        } else {
          setError('Falha ao carregar dados');
        }
      } catch {
        if (mounted) {
          setError('Falha ao carregar dados');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadUserData();
    return () => { mounted = false };
  }, []);

  // Salva as alterações do perfil do usuário
  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    setSaving(true);
    
    try {
      let response: Response;
      
      // Se há um arquivo selecionado, envia como FormData
      if (selectedFile) {
        const formData = new FormData();
        formData.append('name', name || '');
        formData.append('image', image || '');
        formData.append('avatar', selectedFile, selectedFileName ?? selectedFile.name);
        
        response = await fetch('/api/user', {
          method: 'PATCH',
          body: formData,
        });
      } else {
        // Caso contrário, envia como JSON
        const payload: { 
          name?: string; 
          image?: string; 
          imageBlob?: string; 
          imageMime?: string 
        } = { name, image };
        
        if (imageBlobBase64) {
          payload.imageBlob = imageBlobBase64;
          const mime = localPreview ? getMimeFromDataUrl(localPreview) : undefined;
          if (mime) payload.imageMime = mime;
        }
        
        response = await fetch('/api/user', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      
      const result = await response.json() as UpdateResponse;
      
      if ('ok' in result && result.ok === true) {
        // Sucesso - limpa preview e atualiza imagem
        setLocalPreview(null);
        setImageBlobBase64(null);
        setSelectedFile(null);
        setSelectedFileName(null);
        setImage('/api/user/image?ts=' + Date.now());
        setSuccess('✅ Perfil atualizado com sucesso!');
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
        
        router.refresh();
      } else if ('error' in result && typeof result.error === 'string') {
        setError(result.error);
      } else {
        setError('Falha ao atualizar perfil');
      }
    } catch {
      setError('Falha ao atualizar perfil');
    } finally {
      setSaving(false);
    }
  };

  // Extrai o tipo MIME de uma data URL
  const getMimeFromDataUrl = (dataUrl: string | null): string | undefined => {
    if (!dataUrl) return undefined;
    const match = /^data:([^;]+);base64,/.exec(dataUrl);
    return match ? match[1] : undefined;
  };

  // Manipula a seleção de arquivos de imagem
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validação do arquivo
    const MAX_SIZE_BYTES = 2_000_000; // 2MB
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
    
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Tipo de imagem não suportado. Use PNG, JPEG, WEBP ou GIF.');
      return;
    }
    
    if (file.size > MAX_SIZE_BYTES) {
      setError('Imagem muito grande (máximo 2MB).');
      return;
    }

    // Lê o arquivo e cria preview
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setLocalPreview(result);
        const base64 = result.replace(/^data:[^;]+;base64,/, '');
        setImageBlobBase64(base64);
        setSelectedFileName(file.name);
        setSelectedFile(file);
        setError(null);
      }
    };
    reader.readAsDataURL(file);
  };
  
  // Remove o arquivo selecionado
  const handleRemoveFile = () => {
    setSelectedFileName(null);
    setLocalPreview(null);
    setImageBlobBase64(null);
    setSelectedFile(null);
    setError(null);
  };

  // Componente Avatar responsivo
  const AvatarSection = () => {
    const avatarSize = { xs: 80, sm: 100 }; // Tamanhos responsivos
    
    return (
      <Box 
        sx={{ 
          width: avatarSize,
          height: avatarSize,
          position: 'relative',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid',
          borderColor: 'neutral.300',
          mx: { xs: 'auto', sm: 0 }, // Centraliza em mobile
        }}
      >
        {localPreview ? (
          <Image 
            src={localPreview} 
            alt={name ?? 'Avatar'} 
            fill 
            style={{ objectFit: 'cover' }} 
            unoptimized 
          />
        ) : image ? (
          <Image 
            src={image} 
            alt={name ?? 'Avatar'} 
            fill 
            style={{ objectFit: 'cover' }} 
            unoptimized 
          />
        ) : (
          <Box 
            sx={{ 
              width: '100%',
              height: '100%',
              bgcolor: 'neutral.100',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography 
              level="h3" 
              sx={{ color: 'neutral.500' }}
            >
              {(name ?? '').slice(0, 1).toUpperCase() || '?'}
            </Typography>
          </Box>
        )}
      </Box>
    );
  };
  
  // Estados de carregamento e erro
  if (loading) {
    return (
      <Box sx={{ 
        maxWidth: 600, 
        mx: 'auto', 
        p: { xs: 2, sm: 4 },
        textAlign: 'center'
      }}>
        <Typography level="body-lg">Carregando perfil...</Typography>
      </Box>
    );
  }
  
  if (error && loading === false) {
    return (
      <Box sx={{ 
        maxWidth: 600, 
        mx: 'auto', 
        p: { xs: 2, sm: 4 },
        textAlign: 'center'
      }}>
        <Typography level="body-lg" color="danger">{error}</Typography>
        <Button 
          variant="outlined" 
          onClick={() => router.back()}
          sx={{ mt: 2 }}
        >
          Voltar
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      maxWidth: 700, 
      mx: 'auto', 
      p: { xs: 2, sm: 4, md: 6 },
      minHeight: '100vh'
    }}>
      {/* Título */}
      <Typography 
        level="h2" 
        sx={{ 
          mb: { xs: 3, sm: 4 },
          textAlign: { xs: 'center', sm: 'left' }
        }}
      >
        Meu Perfil
      </Typography>
      
      {/* Card principal */}
      <Card variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
        <CardContent>
          {/* Mensagem de erro */}
          {error && (
            <Box sx={{ 
              mb: 3, 
              p: 2, 
              bgcolor: 'danger.100', 
              borderRadius: 'md',
              border: '1px solid',
              borderColor: 'danger.300'
            }}>
              <Typography level="body-sm" color="danger">
                {error}
              </Typography>
            </Box>
          )}
          
          {/* Layout responsivo: vertical em mobile, horizontal em desktop */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 3, sm: 4 }}
            alignItems={{ xs: 'center', sm: 'flex-start' }}
          >
            {/* Avatar */}
            <AvatarSection />
            
            {/* Formulário */}
            <Stack spacing={2.5} sx={{ flex: 1, width: '100%', maxWidth: { xs: '100%', sm: 400 } }}>
              {/* Campo Nome */}
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Digite seu nome"
                  size="lg"
                />
              </FormControl>
              
              {/* Campo URL da imagem */}
              <FormControl>
                <FormLabel>URL da Imagem</FormLabel>
                <Input 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  placeholder="https://exemplo.com/avatar.jpg"
                  size="lg"
                />
              </FormControl>
              
              <Divider sx={{ my: 1 }} />
              
              {/* Upload de arquivo */}
              <Box>
                <Typography level="body-sm" sx={{ mb: 1.5, color: 'text.secondary' }}>
                  Ou faça upload de uma imagem:
                </Typography>
                
                <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
                  <input 
                    style={{ display: 'none' }} 
                    type="file" 
                    accept="image/*" 
                    id="avatar-file" 
                    onChange={handleFileChange}
                  />
                  <label htmlFor="avatar-file">
                    <Button 
                      component="span" 
                      variant="outlined" 
                      size="sm"
                      sx={{ minWidth: 'fit-content' }}
                    >
                      Escolher Arquivo
                    </Button>
                  </label>
                  
                  {selectedFileName && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography 
                        level="body-xs" 
                        sx={{ 
                          color: 'text.secondary',
                          maxWidth: { xs: 150, sm: 200 },
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {selectedFileName}
                      </Typography>
                      <Button 
                        variant="plain" 
                        size="sm" 
                        color="danger"
                        onClick={handleRemoveFile}
                      >
                        Remover
                      </Button>
                    </Stack>
                  )}
                </Stack>
                
                <Typography level="body-xs" sx={{ mt: 1, color: 'text.tertiary' }}>
                  Formatos aceitos: PNG, JPEG, WEBP, GIF (máx. 2MB)
                </Typography>
              </Box>
            </Stack>
          </Stack>
          
          {/* Botões de ação */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ 
              mt: { xs: 4, sm: 5 },
              justifyContent: { xs: 'stretch', sm: 'flex-start' }
            }}
          >
            <Button 
              variant="solid" 
              color="primary" 
              onClick={handleSave}
              size="lg"
              sx={{ 
                minWidth: { xs: '100%', sm: 120 },
                order: { xs: 1, sm: 0 }
              }}
            >
              Salvar Alterações
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => router.back()}
              size="lg"
              sx={{ 
                minWidth: { xs: '100%', sm: 100 },
                order: { xs: 2, sm: 1 }
              }}
            >
              Cancelar
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
