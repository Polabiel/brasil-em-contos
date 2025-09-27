"use client";

import { useState } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";

import { api } from "@/trpc/react";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  return (
    <Card variant="soft" sx={{ maxWidth: 400, width: '100%' }}>
      <CardContent>
        <Typography level="title-md" sx={{ mb: 2 }}>
          Seus Posts
        </Typography>
        
        {latestPost ? (
          <Typography level="body-md" sx={{ mb: 3, color: 'text.secondary' }}>
            Seu post mais recente: <strong>{latestPost.name}</strong>
          </Typography>
        ) : (
          <Typography level="body-md" sx={{ mb: 3, color: 'text.secondary' }}>
            Você ainda não tem posts.
          </Typography>
        )}
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPost.mutate({ name });
          }}
        >
          <Stack spacing={2}>
            <Input
              placeholder="Título do post"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              required
            />
            <Button
              type="submit"
              variant="solid"
              color="primary"
              loading={createPost.isPending}
              disabled={createPost.isPending || !name.trim()}
            >
              {createPost.isPending ? "Enviando..." : "Criar Post"}
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
