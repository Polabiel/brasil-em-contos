"use client";

import { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Table from "@mui/joy/Table";
import IconButton from "@mui/joy/IconButton";
import Chip from "@mui/joy/Chip";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Input from "@mui/joy/Input";
import { useRouter } from "next/navigation";

type Post = {
  id: number;
  name: string;
  content: string | null;
  description?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function AdminPostsClient({ posts }: { posts: Post[] }) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newPostName, setNewPostName] = useState("");
  const [newPostImage, setNewPostImage] = useState("");
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  async function handleCreatePost() {
    if (!newPostName.trim()) return;

    setCreating(true);
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newPostName, image: newPostImage ?? undefined }),
      });

      if (!res.ok) throw new Error('Failed to create');

      const data = (await res.json()) as { post: { id: number } };
      setCreateModalOpen(false);
      setNewPostName("");
      setNewPostImage("");
      router.push(`/admin/posts/${data.post.id}/edit`);
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
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar post');
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

      <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <ModalDialog>
          <Typography level="title-lg" sx={{ mb: 2 }}>Criar Novo Post</Typography>
          <Stack spacing={2}>
                <Input
                  value={newPostImage}
                  onChange={(e) => setNewPostImage((e.target as HTMLInputElement).value)}
                  placeholder="URL da imagem (opcional)"
                />
            <Input
              value={newPostName}
              onChange={(e) => setNewPostName((e.target as HTMLInputElement).value)}
              placeholder="Título do post"
              onKeyPress={(e) => e.key === 'Enter' && handleCreatePost()}
              autoFocus
            />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button 
                variant="plain" 
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
            </Box>
          </Stack>
        </ModalDialog>
      </Modal>
    </Box>
  );
}