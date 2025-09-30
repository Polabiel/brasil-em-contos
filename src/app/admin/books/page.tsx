"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Table,
  Sheet,
  Chip,
  Input,
  Select,
  Option,
} from "@mui/joy";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/react";
import StandardModal from "@/app/_components/ui/StandardModal";

type Book = RouterOutputs["book"]["list"][number];

export default function BooksAdminPage() {
  const { data: books = [], isLoading, refetch } = api.book.list.useQuery();
  const { data: authors = [] } = api.author.list.useQuery();
  const deleteMutation = api.book.delete.useMutation({
    onSuccess: () => void refetch(),
  });
  const createMutation = api.book.create.useMutation({
    onSuccess: () => {
      void refetch();
      setShowCreateModal(false);
      setCreateForm({ title: "", year: "", authorId: 0 });
    },
  });
  const updateMutation = api.book.update.useMutation({
    onSuccess: () => {
      void refetch();
      setShowEditModal(false);
      setEditForm({ id: 0, title: "", year: "", authorId: 0 });
    },
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    title: "",
    year: "",
    authorId: 0 as number,
  });
  const [editForm, setEditForm] = useState({
    id: 0,
    title: "",
    year: "",
    authorId: 0 as number,
  });

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar este livro?")) {
      try {
        await deleteMutation.mutateAsync({ id });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erro desconhecido";
        alert("Falha ao deletar livro: " + msg);
      }
    }
  };

  const handleCreate = async () => {
    if (!createForm.title.trim()) return;
    try {
      const yearNum = createForm.year ? Number(createForm.year) : undefined;
      await createMutation.mutateAsync({
        title: createForm.title.trim(),
        year: yearNum && !isNaN(yearNum) ? yearNum : undefined,
        authorId: createForm.authorId,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      alert("Falha ao criar livro: " + msg);
    }
  };

  const handleUpdate = async () => {
    if (!editForm.title.trim()) return;
    try {
      const yearNum = editForm.year ? Number(editForm.year) : undefined;
      await updateMutation.mutateAsync({
        id: editForm.id,
        title: editForm.title.trim(),
        year: yearNum && !isNaN(yearNum) ? yearNum : undefined,
        authorId: editForm.authorId,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      alert("Falha ao atualizar livro: " + msg);
    }
  };

  const openEditModal = (book: Book) => {
    setEditForm({
      id: book.id,
      title: book.title,
      year: book.year ? String(book.year) : "",
      authorId: book.authorId ?? 0,
    });
    setShowEditModal(true);
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography level="h3">Carregando livros...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography level="h2">Gerenciar Livros</Typography>
        <Button
          variant="solid"
          color="primary"
          onClick={() => setShowCreateModal(true)}
        >
          Criar Livro
        </Button>
      </Stack>

      <Sheet variant="outlined" sx={{ borderRadius: 2, overflow: "auto" }}>
        <Table hoverRow>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Ano</th>
              <th>Autor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>
                  <Typography fontWeight="md">📖 {book.title}</Typography>
                </td>
                <td>
                  {book.year && (
                    <Chip size="sm" variant="soft" color="neutral">
                      {book.year}
                    </Chip>
                  )}
                </td>
                <td>
                  {book.authorName ? (
                    <Typography level="body-sm">{book.authorName}</Typography>
                  ) : (
                    <Typography level="body-xs" color="neutral">
                      Sem autor
                    </Typography>
                  )}
                </td>
                <td>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={() => openEditModal(book)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outlined"
                      color="danger"
                      onClick={() => handleDelete(book.id)}
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
        title="Criar Novo Livro"
        size="lg"
      >
        <Stack spacing={3}>
          <Input
            placeholder="Título do livro"
            value={createForm.title}
            onChange={(e) =>
              setCreateForm((prev) => ({ ...prev, title: e.target.value }))
            }
            size="lg"
          />
          <Input
            placeholder="Ano de publicação (opcional)"
            type="number"
            value={createForm.year}
            onChange={(e) =>
              setCreateForm((prev) => ({ ...prev, year: e.target.value }))
            }
            size="lg"
          />
          <Select
            placeholder="Autor (opcional)"
            value={createForm.authorId}
            onChange={(v) => {
              const val = typeof v === "number" ? v : Number(v);
              setCreateForm((prev) => ({
                ...prev,
                authorId: val > 0 ? val : 0,
              }));
            }}
            size="lg"
          >
            <Option value={0}>-- Sem autor --</Option>
            {authors.map((author) => (
              <Option key={author.id} value={author.id}>
                {author.name}
              </Option>
            ))}
          </Select>
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
              disabled={createMutation.isPending || !createForm.title.trim()}
            >
              {createMutation.isPending ? "Criando..." : "Criar Livro"}
            </Button>
          </Stack>
        </Stack>
      </StandardModal>

      {/* Edit Modal */}
      <StandardModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Editar Livro"
        size="lg"
      >
        <Stack spacing={3}>
          <Input
            placeholder="Título do livro"
            value={editForm.title}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, title: e.target.value }))
            }
            size="lg"
          />
          <Input
            placeholder="Ano de publicação (opcional)"
            type="number"
            value={editForm.year}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, year: e.target.value }))
            }
            size="lg"
          />
          <Select
            placeholder="Autor (opcional)"
            value={editForm.authorId}
            onChange={(v) => {
              const val = typeof v === "number" ? v : Number(v);
              setEditForm((prev) => ({
                ...prev,
                authorId: val > 0 ? val : 0,
              }));
            }}
            size="lg"
          >
            <Option value={0}>-- Sem autor --</Option>
            {authors.map((author) => (
              <Option key={author.id} value={author.id}>
                {author.name}
              </Option>
            ))}
          </Select>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => setShowEditModal(false)}>
              Cancelar
            </Button>
            <Button
              variant="solid"
              onClick={handleUpdate}
              disabled={updateMutation.isPending || !editForm.title.trim()}
            >
              {updateMutation.isPending ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </Stack>
        </Stack>
      </StandardModal>
    </Box>
  );
}
