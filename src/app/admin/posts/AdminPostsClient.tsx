"use client";

import { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Table from "@mui/joy/Table";
import IconButton from "@mui/joy/IconButton";
import Chip from "@mui/joy/Chip";
import Input from "@mui/joy/Input";
import { useRouter } from "next/navigation";
import { api } from '@/trpc/react';
import StandardModal from "@/app/_components/ui/StandardModal";

type Post = {
  id: number;
  name: string;
  content: string | null;
  description?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
};

export default function AdminPostsClient({ posts }: { posts: Post[] }) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newPostName, setNewPostName] = useState("");
  const [newPostImage, setNewPostImage] = useState("");
  const [creating, setCreating] = useState(false);
  const router = useRouter();
  const utils = api.useContext();
  const createPostMutation = api.post.create.useMutation({
    onSuccess: (data) => {
      // navigate to edit page for created post
      router.push(`/admin/posts/${data.id}/edit`);
      void utils.post.adminList.invalidate();
    }
  });

  const deletePostMutation = api.post.delete.useMutation({
    onSuccess: () => void utils.post.adminList.invalidate(),
  });

  const updateFeaturedMutation = api.post.updateFeatured.useMutation({
    onSuccess: () => void utils.post.adminList.invalidate(),
  });

  async function handleCreatePost() {
    if (!newPostName.trim()) return;

    if (!newPostName.trim()) return;
    setCreating(true);
    try {
      await createPostMutation.mutateAsync({ name: newPostName.trim(), image: newPostImage ?? null });
      setCreateModalOpen(false);
      setNewPostName("");
      setNewPostImage("");
    } catch (err) {
      console.error(err);
      alert('Erro ao criar post');
    } finally {
      setCreating(false);
    }
  }

  async function handleDeletePost(id: number) {
    if (!confirm('Tem certeza que deseja deletar este post?')) return;

    try {
      await deletePostMutation.mutateAsync({ id });
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar post');
    }
  }

  async function handleToggleFeatured(id: number, currentFeatured: boolean) {
    try {
      await updateFeaturedMutation.mutateAsync({ id, featured: !currentFeatured });
    } catch (err) {
      console.error(err);
      alert('Erro ao alterar status de destaque');
    }
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', py: 6 }}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography level="h4">Gerenciar Posts</Typography>
          <Button
            variant="solid"
            color="primary"
            onClick={() => setCreateModalOpen(true)}
          >
            Criar Novo Post
          </Button>
        </Box>

        <Table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Status</th>
              <th>Destaque</th>
              <th>Criado em</th>
              <th>Atualizado em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.name}</td>
                <td>
                  <Chip 
                    color={post.content?.trim() ? 'success' : 'warning'}
                    variant="soft"
                    size="sm"
                  >
                    {post.content?.trim() ? 'Com conteúdo' : 'Sem conteúdo'}
                  </Chip>
                </td>
                <td>
                  <IconButton
                    size="sm"
                    variant={post.featured ? "solid" : "outlined"}
                    color={post.featured ? "warning" : "neutral"}
                    onClick={() => handleToggleFeatured(post.id, post.featured)}
                    aria-label={post.featured ? "Remover destaque" : "Destacar post"}
                    title={post.featured ? "Remover destaque" : "Destacar post"}
                  >
                    <i className="fas fa-star" />
                  </IconButton>
                </td>
                <td>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</td>
                <td>{new Date(post.updatedAt).toLocaleDateString('pt-BR')}</td>
                <td>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      size="sm"
                      variant="outlined"
                      onClick={() => router.push(`/admin/posts/${post.id}/edit`)}
                      aria-label={`Editar ${post.name}`}
                    >
                      <i className="fas fa-pen" />
                    </IconButton>
                    <IconButton
                      size="sm"
                      variant="outlined"
                      color="danger"
                      onClick={() => handleDeletePost(post.id)}
                      aria-label={`Deletar ${post.name}`}
                    >
                      <i className="fas fa-trash" />
                    </IconButton>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        {posts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography level="body-lg" sx={{ color: 'var(--cv-textMuted80)' }}>
              Nenhum post encontrado. Crie seu primeiro post!
            </Typography>
          </Box>
        )}
      </Stack>

      <StandardModal 
        open={createModalOpen} 
        onClose={() => setCreateModalOpen(false)}
        title="Criar Novo Post"
        size="md"
      >
        <Stack spacing={3}>
          <Input
            value={newPostName}
            onChange={(e) => setNewPostName((e.target as HTMLInputElement).value)}
            placeholder="Título do post"
            onKeyPress={(e) => e.key === 'Enter' && handleCreatePost()}
            autoFocus
            size="lg"
          />
          <Input
            value={newPostImage}
            onChange={(e) => setNewPostImage((e.target as HTMLInputElement).value)}
            placeholder="URL da imagem (opcional)"
            size="lg"
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button 
              variant="outlined" 
              onClick={() => setCreateModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="solid" 
              color="primary"
              loading={creating}
              onClick={handleCreatePost}
              disabled={!newPostName.trim()}
            >
              Criar e Editar
            </Button>
          </Stack>
        </Stack>
      </StandardModal>
    </Box>
  );
}