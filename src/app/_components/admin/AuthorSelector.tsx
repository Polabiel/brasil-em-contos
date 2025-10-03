"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import { api } from "@/trpc/react";
import StandardModal from "@/app/_components/ui/StandardModal";

interface AuthorSelectorProps {
  value?: number | null;
  onChange: (v: number | null) => void;
}

export default function AuthorSelector({
  value,
  onChange,
}: AuthorSelectorProps) {
  const { data: authorsRaw = [], isLoading } = api.author.list.useQuery();
  const authors = authorsRaw
    .map((a) => ({
      ...a,
      id: typeof a.id === "string" ? Number(a.id) : a.id,
    }))
    .filter((a) => typeof a.id === "number" && !Number.isNaN(a.id));
  const ctx = api.useContext();
  const create = api.author.create.useMutation({
    onSuccess() {
      void ctx.author.list.invalidate();
    },
  });
  const isCreating = Boolean(create.isPending);

  const [open, setOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [period, setPeriod] = useState("");
  const [bio, setBio] = useState("");
  const nameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => nameRef.current?.focus(), 50);
    }
  }, [open]);

  return (
    <Stack spacing={1}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Box sx={{ flex: 1 }}>
          {value ? (
            (() => {
              const sel = authors.find((a) => a.id === value);
              if (!sel)
                return (
                  <Typography level="body-md">Autor selecionado</Typography>
                );
              return (
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "var(--cv-neutral100)",
                    }}
                  >
                    {sel.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={sel.image}
                        alt={sel.name ?? ""}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ color: "var(--cv-neutral500)" }}>
                          {String(sel.name ?? "")
                            .slice(0, 1)
                            .toUpperCase()}
                        </span>
                      </Box>
                    )}
                  </Box>
                  <Box>
                    <Typography level="body-md" sx={{ fontWeight: 600 }}>
                      {sel.name}
                    </Typography>
                    {sel.period ? (
                      <Typography
                        level="body-xs"
                        sx={{ color: "var(--cv-textMuted80)" }}
                      >
                        {sel.period}
                      </Typography>
                    ) : null}
                  </Box>
                </Box>
              );
            })()
          ) : (
            <Typography level="body-md" sx={{ color: "var(--cv-textMuted80)" }}>
              Nenhum autor selecionado
            </Typography>
          )}
        </Box>
        <Button variant="outlined" onClick={() => setPickerOpen(true)}>
          Selecionar Autor
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Criar novo autor
        </Button>
      </Box>

      <StandardModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title="Selecionar Autor"
        size="md"
      >
        <Stack spacing={2}>
          <Input
            placeholder="Pesquisar autor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="md"
          />
          <List sx={{ maxHeight: 300, overflow: "auto" }}>
            {isLoading ? (
              <ListItem>Carregando...</ListItem>
            ) : (
              authors
                .filter((a) => {
                  if (!search) return true;
                  const s = search.toLowerCase();
                  return (
                    (a.name ?? "").toLowerCase().includes(s) ||
                    (a.period ?? "").toLowerCase().includes(s)
                  );
                })
                .map((a) => (
                  <ListItem
                    key={a.id}
                    onClick={() => {
                      if (typeof a.id === "number" && !Number.isNaN(a.id)) {
                        onChange(a.id);
                        setPickerOpen(false);
                      }
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    <ListItemDecorator>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          overflow: "hidden",
                          background: "var(--cv-neutral100)",
                        }}
                      >
                        {a.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={a.image}
                            alt={a.name ?? ""}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span style={{ color: "var(--cv-neutral500)" }}>
                              {String(a.name ?? "")
                                .slice(0, 1)
                                .toUpperCase()}
                            </span>
                          </Box>
                        )}
                      </Box>
                    </ListItemDecorator>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography level="body-md" sx={{ fontWeight: 600 }}>
                        {a.name}
                      </Typography>
                      {a.period ? (
                        <Typography
                          level="body-xs"
                          sx={{ color: "var(--cv-textMuted80)" }}
                        >
                          {a.period}
                        </Typography>
                      ) : null}
                    </Box>
                  </ListItem>
                ))
            )}
          </List>
        </Stack>
      </StandardModal>

      <StandardModal
        open={open}
        onClose={() => setOpen(false)}
        title="Criar Novo Autor"
        size="md"
      >
        <Stack spacing={3}>
          <Input
            placeholder="Nome do autor"
            value={name}
            onChange={(e) => setName(e.target.value)}
            slotProps={{ input: { ref: nameRef } }}
            size="lg"
          />
          <Input
            placeholder="Período literário (opcional)"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            size="lg"
          />
          <Textarea
            placeholder="Biografia (opcional)"
            value={bio}
            onChange={(e) => setBio((e.target as HTMLTextAreaElement).value)}
            minRows={4}
            size="lg"
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              disabled={isCreating}
              size="lg"
            >
              Cancelar
            </Button>
            <Button
              variant="solid"
              onClick={async () => {
                if (!name.trim()) return;
                try {
                  const createdRaw: unknown = await create.mutateAsync({
                    name: name.trim(),
                    period: period ? period.trim() : undefined,
                    bio: bio ? bio.trim() : undefined,
                  });
                  // extract id safely from unknown
                  let newId: number | null = null;
                  if (createdRaw && typeof createdRaw === "object") {
                    const rec = createdRaw as Record<string, unknown>;
                    const idVal = rec.id;
                    if (typeof idVal === "number") newId = idVal;
                    else if (typeof idVal === "string" && idVal !== "") {
                      const parsed = Number(idVal);
                      newId = Number.isFinite(parsed) ? parsed : null;
                    }
                  }
                  onChange(newId);
                  setOpen(false);
                  setName("");
                  setPeriod("");
                  setBio("");
                } catch (err: unknown) {
                  const msg =
                    err instanceof Error
                      ? err.message
                      : typeof err === "string"
                        ? err
                        : JSON.stringify(err);
                  console.error(msg);
                  alert("Falha ao criar autor: " + msg);
                }
              }}
              disabled={isCreating || !name.trim()}
              size="lg"
            >
              {create.isPending ? "Criando..." : "Criar Autor"}
            </Button>
          </Stack>
        </Stack>
      </StandardModal>
    </Stack>
  );
}
