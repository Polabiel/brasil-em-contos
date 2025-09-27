"use client";

import { useState, useEffect, useCallback } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { useRouter } from "next/navigation";
import MDEditor from '@uiw/react-md-editor';

export default function EditPostClient({ id, initialName, initialContent }: { id: number; initialName: string; initialContent: string }) {
  const [name, setName] = useState(initialName);
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const router = useRouter();

  const handleAutoSave = useCallback(async () => {
    setAutoSaving(true);
    try {
      await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content }),
      });
    } catch (err) {
      console.error('Auto-save failed:', err);
    } finally {
      setAutoSaving(false);
    }
  }, [id, name, content]);

  // Auto-save every 5 seconds when content changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if ((name !== initialName || content !== initialContent) && !saving) {
        void handleAutoSave();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [name, content, initialName, initialContent, saving, handleAutoSave]);

  async function handleSave() {
    if (!name.trim()) {
      alert('Título é obrigatório');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content }),
      });
      if (!res.ok) throw new Error('Falha ao salvar');
      router.push('/admin/posts');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', py: 6 }}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography level="h4">Editar post</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {autoSaving && (
              <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted80)' }}>
                Auto-salvando...
              </Typography>
            )}
            <Button variant="solid" color="primary" onClick={handleSave} loading={saving}>
              Salvar
            </Button>
            <Button variant="plain" onClick={() => router.back()}>
              Cancelar
            </Button>
          </Box>
        </Box>

        <Input
          value={name}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          placeholder="Título do post"
          size="lg"
          error={!name.trim()}
        />

        <Box>
          <Typography level="body-lg" sx={{ fontWeight: 700, mb: 2 }}>
            Conteúdo (Markdown)
          </Typography>
          <MDEditor
            value={content}
            onChange={(val) => setContent(val ?? '')}
            preview="edit"
            height={600}
            data-color-mode="light"
            visibleDragbar={false}
          />
        </Box>
      </Stack>
    </Box>
  );
}
