"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Table, Sheet, Chip, Input, Textarea } from '@mui/joy';
import { api } from '@/trpc/react';
import type { RouterOutputs } from '@/trpc/react';
import StandardModal from '@/app/_components/ui/StandardModal';

type Author = RouterOutputs['author']['list'][number];

export default function AuthorsAdminPage() {
  const { data: authors = [], isLoading } = api.author.list.useQuery();
  const utils = api.useContext();
  const deleteMutation = api.author.delete.useMutation({
    onSuccess: () => void utils.author.list.invalidate()
  });
  const createMutation = api.author.create.useMutation({
    onSuccess: () => {
      void utils.author.list.invalidate();
      setShowCreateModal(false);
      setCreateForm({ name: '', period: '', bio: '' });
    }
  });
  const updateMutation = api.author.update.useMutation({
    onSuccess: () => {
      void utils.author.list.invalidate();
      setShowEditModal(false);
      setEditForm({ id: 0, name: '', period: '', bio: '' });
    }
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [createForm, setCreateForm] = useState({ name: '', period: '', bio: '' });
  const [editForm, setEditForm] = useState({ id: 0, name: '', period: '', bio: '' });

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja deletar este autor? Todos os livros associados também serão removidos.')) {
      try {
        await deleteMutation.mutateAsync({ id });
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erro desconhecido';
        alert('Falha ao deletar autor: ' + msg);
      }
    }
  };

  const handleCreate = async () => {
    if (!createForm.name.trim()) return;
    try {
      await createMutation.mutateAsync({
        name: createForm.name.trim(),
        period: createForm.period || undefined,
        bio: createForm.bio || undefined
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro desconhecido';
      alert('Falha ao criar autor: ' + msg);
    }
  };

  const handleUpdate = async () => {
    if (!editForm.name.trim()) return;
    try {
      await updateMutation.mutateAsync({
        id: editForm.id,
        name: editForm.name.trim(),
        period: editForm.period || undefined,
        bio: editForm.bio || undefined
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro desconhecido';
      alert('Falha ao atualizar autor: ' + msg);
    }
  };

  const openEditModal = (author: Author) => {
    setEditForm({
      id: author.id,
      name: author.name,
      period: author.period ?? '',
      bio: '' // bio not available in list type
    });
    setShowEditModal(true);
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography level="h3">Carregando autores...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography level="h2">Gerenciar Autores</Typography>
        <Button variant="solid" color="primary" onClick={() => setShowCreateModal(true)}>
          Criar Autor
        </Button>
      </Stack>

      <Sheet variant="outlined" sx={{ borderRadius: 2, overflow: 'auto' }}>
        <Table hoverRow>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Período</th>
              <th>Livros</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>
                  <Typography fontWeight="md">{author.name}</Typography>
                </td>
                <td>
                  {author.period && (
                    <Chip size="sm" variant="soft">{author.period}</Chip>
                  )}
                </td>
                <td>
                  <Stack spacing={0.5}>
                    {author.books.slice(0, 2).map((book) => (
                      <Typography key={book.id} level="body-sm">
                        📖 {book.title} {book.year && `(${book.year})`}
                      </Typography>
                    ))}
                    {author.books.length > 2 && (
                      <Typography level="body-xs" color="neutral">
                        +{author.books.length - 2} mais
                      </Typography>
                    )}
                  </Stack>
                </td>
                <td>
                  <Stack direction="row" spacing={1}>
                    <Button size="sm" variant="outlined" onClick={() => openEditModal(author)}>
                      Editar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outlined" 
                      color="danger" 
                      onClick={() => handleDelete(author.id)}
                      disabled={deleteMutation.isPending}
                    >
                      Deletar
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      {/* Create Modal */}
      <StandardModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        title="Criar Novo Autor"
        size="lg"
      >
        <Stack spacing={3}>
          <Input
            placeholder="Nome do autor"
            value={createForm.name}
            onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
            size="lg"
          />
          <Input
            placeholder="Período literário (opcional)"
            value={createForm.period}
            onChange={(e) => setCreateForm(prev => ({ ...prev, period: e.target.value }))}
            size="lg"
          />
          <Textarea
            placeholder="Biografia (opcional)"
            value={createForm.bio}
            onChange={(e) => setCreateForm(prev => ({ ...prev, bio: (e.target as HTMLTextAreaElement).value }))}
            minRows={4}
            size="lg"
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button 
              variant="outlined" 
              onClick={() => setShowCreateModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="solid" 
              onClick={handleCreate}
              disabled={createMutation.isPending || !createForm.name.trim()}
            >
              {createMutation.isPending ? 'Criando...' : 'Criar Autor'}
            </Button>
          </Stack>
        </Stack>
      </StandardModal>

      {/* Edit Modal */}
      <StandardModal 
        open={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Editar Autor"
        size="lg"
      >
        <Stack spacing={3}>
          <Input
            placeholder="Nome do autor"
            value={editForm.name}
            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
            size="lg"
          />
          <Input
            placeholder="Período literário (opcional)"
            value={editForm.period}
            onChange={(e) => setEditForm(prev => ({ ...prev, period: e.target.value }))}
            size="lg"
          />
          <Textarea
            placeholder="Biografia (opcional)"
            value={editForm.bio}
            onChange={(e) => setEditForm(prev => ({ ...prev, bio: (e.target as HTMLTextAreaElement).value }))}
            minRows={4}
            size="lg"
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button 
              variant="outlined" 
              onClick={() => setShowEditModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="solid" 
              onClick={handleUpdate}
              disabled={updateMutation.isPending || !editForm.name.trim()}
            >
              {updateMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </Stack>
        </Stack>
      </StandardModal>
    </Box>
  );
}