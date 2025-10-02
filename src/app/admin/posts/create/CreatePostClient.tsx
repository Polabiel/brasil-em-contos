"use client";

import { useState } from "react";
import MDEditorWrapper from "@/app/_components/MDEditorWrapper";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { api } from "@/trpc/react";
import AuthorSelector from "@/app/_components/admin/AuthorSelector";
import Button from "@mui/joy/Button";
import UploadButton from "@/app/_components/ui/UploadButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_components/ui/ToastProvider";

export default function CreatePostClient() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const utils = api.useContext();
  const createMutation = api.post.create.useMutation({
    onSuccess: () => {
      void utils.post.adminList.invalidate();
      router.back();
    },
  });
  const toast = useToast();

  async function handleCreate() {
    if (!name.trim()) return;
    setLoading(true);
    try {
      let res: Response;
      if (selectedFile) {
        const fd = new FormData();
        fd.append("name", name);
        if (authorId != null) fd.append("authorId", String(authorId));
        if (tag) fd.append("tag", tag);
        fd.append("description", description || "");
        fd.append("content", content || "");
        fd.append("image", image || "");
        if (createdAt)
          fd.append("createdAt", new Date(createdAt).toISOString());
        if (updatedAt)
          fd.append("updatedAt", new Date(updatedAt).toISOString());
        fd.append(
          "imageFile",
          selectedFile,
          selectedFileName ?? selectedFile.name,
        );
        res = await fetch("/api/admin/posts", { method: "POST", body: fd });
      } else {
        if (createdAt || updatedAt) {
          const fd = new FormData();
          fd.append("name", name);
          if (authorId != null) fd.append("authorId", String(authorId));
          if (tag) fd.append("tag", tag);
          fd.append("description", description || "");
          fd.append("content", content || "");
          fd.append("image", image || "");
          if (createdAt)
            fd.append("createdAt", new Date(createdAt).toISOString());
          if (updatedAt)
            fd.append("updatedAt", new Date(updatedAt).toISOString());
          res = await fetch("/api/admin/posts", { method: "POST", body: fd });
        } else {
          await createMutation.mutateAsync({
            name,
            description: description ?? undefined,
            image: image ?? undefined,
            tag: tag ?? undefined,
            authorId: authorId ?? undefined,
          });
          res = new Response(null, { status: 200 });
        }
      }
      if (!res.ok) throw new Error("failed");
      await res.json().catch(() => null);
      router.back();
    } catch (err) {
      console.error(err);
      toast.push("Erro ao criar post", "danger");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", py: 6 }}>
      <Stack spacing={2}>
        <Typography level="h4">Criar post</Typography>
        <Input
          placeholder="Título do post"
          value={name}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
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
          placeholder="Tag do livro (opcional)"
          value={tag}
          onChange={(e) => setTag(e as string | null)}
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
            buttonLabel="Enviar imagem"
            onChange={async (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (!file) return;
              setSelectedFileName(file.name);
              setSelectedFile(file);
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result as string;
                // preview via data URL
                setImage(result);
              };
              reader.readAsDataURL(file);
            }}
          />

          {selectedFileName && (
            <Typography level="body-sm" sx={{ mt: 1 }}>
              {selectedFileName}
            </Typography>
          )}
        </Box>

        <div>
          <Typography sx={{ mb: 1, fontSize: 14 }}>
            Conteúdo (Markdown)
          </Typography>
          <div data-color-mode="light">
            <MDEditorWrapper
              value={content}
              onChange={(v?: string) => setContent(v ?? "")}
              height={600}
            />
          </div>
        </div>
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button variant="plain" onClick={() => router.push("/admin/posts")}>
            Cancelar
          </Button>
          <Button
            variant="solid"
            color="primary"
            loading={loading}
            onClick={handleCreate}
            disabled={!name.trim()}
          >
            Criar
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
