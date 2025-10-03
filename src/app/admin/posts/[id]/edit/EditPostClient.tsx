"use client";

import { useState, useEffect, useCallback } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import UploadButton from "@/app/_components/ui/UploadButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import AuthorSelector from "@/app/_components/admin/AuthorSelector";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import MDEditorWrapper from "@/app/_components/MDEditorWrapper";
import { useToast } from "@/app/_components/ui/ToastProvider";

export default function EditPostClient({
  id,
  initialName,
  initialContent,
  initialDescription,
  initialImage,
  initialTags,
  initialAuthorId,
}: {
  id: number;
  initialName: string;
  initialContent: string;
  initialDescription?: string;
  initialImage?: string;
  initialTags?: string[];
  initialAuthorId?: number | null;
  initialCreatedAt?: string | null;
  initialUpdatedAt?: string | null;
}) {
  const [name, setName] = useState(initialName);
  const [content, setContent] = useState(initialContent);
  const [description, setDescription] = useState(initialDescription ?? "");
  const [image, setImage] = useState(initialImage ?? "");
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>(initialTags ?? []);
  const [authorId, setAuthorId] = useState<number | null>(
    initialAuthorId ?? null,
  );
  const [imageBlobBase64, setImageBlobBase64] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const router = useRouter();
  const utils = api.useContext();
  const updateMutation = api.post.update.useMutation({
    onSuccess: () => void utils.post.adminList.invalidate(),
  });
  const toast = useToast();

  const handleAutoSave = useCallback(async () => {
    setAutoSaving(true);
    try {
      if (selectedFile) {
        const form = new FormData();
        form.append("name", name);
        if (tags.length > 0) form.append("tags", JSON.stringify(tags));
        if (authorId != null) form.append("authorId", String(authorId));
        form.append("content", content);
        form.append("description", description ?? "");
        form.append("image", image ?? "");
        if (createdAt)
          form.append("createdAt", new Date(createdAt).toISOString());
        if (updatedAt)
          form.append("updatedAt", new Date(updatedAt).toISOString());
        form.append("imageFile", selectedFile);
        await fetch(`/api/admin/posts/${id}`, {
          method: "PUT",
          body: form,
        });
      } else {
        const payload = {
          id,
          name,
          content,
          description,
          image: image ?? undefined,
          tags: tags,
          authorId: authorId ?? undefined,
        };

        await updateMutation.mutateAsync(payload);
      }
    } catch (err) {
      console.error("Auto-save failed:", err);
    } finally {
      setAutoSaving(false);
    }
  }, [
    selectedFile,
    name,
    tags,
    authorId,
    content,
    description,
    image,
    createdAt,
    updatedAt,
    id,
    updateMutation,
  ]);

  // Auto-save every 5 seconds when content changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        (name !== initialName ||
          content !== initialContent ||
          description !== (initialDescription ?? "") ||
          image !== "" ||
          imageBlobBase64) &&
        !saving
      ) {
        void handleAutoSave();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [
    name,
    content,
    initialName,
    initialContent,
    saving,
    handleAutoSave,
    description,
    image,
    initialDescription,
    imageBlobBase64,
    tags,
  ]);

  async function handleSave() {
    if (!name.trim()) {
      toast.push("Título é obrigatório", "warning");
      return;
    }
    setSaving(true);
    try {
      let res: Response;
      if (selectedFile) {
        const form = new FormData();
        form.append("name", name);
        form.append("content", content);
        form.append("description", description ?? "");
        form.append("image", image ?? "");
        if (tags.length > 0) form.append("tags", JSON.stringify(tags));
        form.append("imageFile", selectedFile);
        res = await fetch(`/api/admin/posts/${id}`, {
          method: "PUT",
          body: form,
        });
      } else {
        res = await fetch(`/api/admin/posts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            content,
            tags: tags,
            authorId: authorId ?? undefined,
            description,
            image,
            imageBlob: imageBlobBase64 ?? undefined,
            imageMime: imageMime ?? undefined,
          }),
        });
      }
      if (!res.ok) throw new Error("Falha ao salvar");
      window.location.href = `/posts/${id}`;
    } catch (err) {
      console.error(err);
      toast.push("Erro ao salvar", "danger");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", py: 6 }}>
      <Stack spacing={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography level="h4">Editar post</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {autoSaving && (
              <Typography
                level="body-sm"
                sx={{ color: "var(--cv-textMuted80)" }}
              >
                Auto-salvando...
              </Typography>
            )}
            <Button
              variant="solid"
              color="primary"
              onClick={handleSave}
              loading={saving}
            >
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

        <Input
          value={description}
          onChange={(e) => setDescription((e.target as HTMLInputElement).value)}
          placeholder="Descrição curta (opcional)"
          size="md"
        />

        <Input
          value={image}
          onChange={(e) => setImage((e.target as HTMLInputElement).value)}
          placeholder="URL da imagem (opcional)"
          size="md"
        />

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ minWidth: 220 }}>
            <Typography level="body-sm">Data de criação (opcional)</Typography>
            <Input
              type="datetime-local"
              value={createdAt ?? ""}
              onChange={(e) =>
                setCreatedAt((e.target as HTMLInputElement).value || null)
              }
            />
          </Box>

          <Box sx={{ minWidth: 220 }}>
            <Typography level="body-sm">
              Data de atualização (opcional)
            </Typography>
            <Input
              type="datetime-local"
              value={updatedAt ?? ""}
              onChange={(e) =>
                setUpdatedAt((e.target as HTMLInputElement).value || null)
              }
            />
          </Box>
        </Box>

        <Select
          placeholder="Tags do livro (opcional)"
          multiple
          value={tags}
          onChange={(_, newValue) => setTags(newValue as string[])}
          size="md"
        >
          {(api.post.bookTags.useQuery().data ?? []).map((v) => (
            <Option key={v} value={v}>
              {v
                .replaceAll("_", " ")
                .toLowerCase()
                .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase())}
            </Option>
          ))}
        </Select>

        <AuthorSelector value={authorId} onChange={setAuthorId} />

        <Box>
          <UploadButton
            buttonLabel="Trocar / Enviar imagem"
            onChange={async (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (!file) return;
              setSelectedFile(file);
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result as string;
                const maybeBase64 = result.split(",")[1] ?? null;
                setImageBlobBase64(maybeBase64);
                setImageMime(file.type);
                // preview via data URL
                setImage(result);
              };
              reader.readAsDataURL(file);
            }}
          />

          {selectedFile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
              {image ? (
                // thumbnail
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt="preview"
                  style={{
                    width: 96,
                    height: 96,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              ) : null}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography level="body-md" sx={{ fontWeight: 600 }}>
                  {selectedFile.name}
                </Typography>
                <Typography
                  level="body-sm"
                  sx={{ color: "var(--cv-textMuted80)" }}
                >
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </Typography>
                <Box>
                  <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => {
                      setSelectedFile(null);
                      setImageBlobBase64(null);
                      setImageMime(null);
                      setImage("");
                    }}
                  >
                    Remover arquivo
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        <Box>
          <Typography level="body-lg" sx={{ fontWeight: 700, mb: 2 }}>
            Conteúdo (Markdown)
          </Typography>
          <MDEditorWrapper
            value={content}
            onChange={(val) => setContent(val ?? "")}
            preview={"edit"}
            height={600}
            visibleDragbar={false}
          />
        </Box>
      </Stack>
    </Box>
  );
}
