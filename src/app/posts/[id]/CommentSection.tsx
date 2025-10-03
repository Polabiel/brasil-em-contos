"use client";

import { useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import Link from "next/link";
import Image from "next/image";

interface CommentSectionProps {
  postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const utils = api.useUtils();

  // Query comments
  const { data: comments, isLoading } = api.comment.list.useQuery({ postId });

  // Create comment mutation
  const createComment = api.comment.create.useMutation({
    onSuccess: () => {
      void utils.comment.list.invalidate({ postId });
      setNewComment("");
      setReplyContent("");
      setReplyTo(null);
    },
  });

  // Delete comment mutation
  const deleteComment = api.comment.delete.useMutation({
    onSuccess: () => {
      void utils.comment.list.invalidate({ postId });
    },
  });

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    createComment.mutate({ postId, content: newComment });
  };

  const handleSubmitReply = (parentId: number) => {
    if (!replyContent.trim()) return;
    createComment.mutate({ postId, content: replyContent, parentId });
  };

  const handleDeleteComment = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este comentário?")) {
      deleteComment.mutate({ id });
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Typography level="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Comentários
      </Typography>

      {!session ? (
        <Card
          variant="soft"
          sx={{
            p: 3,
            textAlign: "center",
            bgcolor: "var(--cv-neutral100)",
          }}
        >
          <Typography level="body-md" sx={{ mb: 2 }}>
            Você precisa estar logado para comentar
          </Typography>
          <Link href="/auth/signin" style={{ textDecoration: "none" }}>
            <Button variant="solid" color="primary">
              Fazer Login
            </Button>
          </Link>
        </Card>
      ) : (
        <Card variant="outlined" sx={{ mb: 4, p: 3 }}>
          <Typography level="body-sm" sx={{ mb: 2, fontWeight: 600 }}>
            Adicionar comentário
          </Typography>
          <Textarea
            placeholder="Escreva seu comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            minRows={3}
            maxRows={8}
            sx={{ mb: 2 }}
            disabled={createComment.isPending}
          />
          <Button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || createComment.isPending}
            loading={createComment.isPending}
            variant="solid"
            color="primary"
          >
            Publicar
          </Button>
        </Card>
      )}

      {isLoading ? (
        <Typography level="body-sm">Carregando comentários...</Typography>
      ) : comments && comments.length > 0 ? (
        <Stack spacing={3}>
          {comments.map((comment) => (
            <Card key={comment.id} variant="outlined" sx={{ p: 3 }}>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                {comment.author.image ? (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      position: "relative",
                      borderRadius: "50%",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={comment.author.image}
                      alt={comment.author.name ?? "User"}
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "var(--cv-neutral200)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Typography level="body-sm" sx={{ fontWeight: 700 }}>
                      {(comment.author.name ?? "U").charAt(0).toUpperCase()}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Box>
                      <Typography level="body-sm" sx={{ fontWeight: 700 }}>
                        {comment.author.name ?? "Usuário"}
                      </Typography>
                      <Typography
                        level="body-xs"
                        sx={{ color: "var(--cv-textMuted80)" }}
                      >
                        {formatDate(comment.createdAt)}
                      </Typography>
                    </Box>
                    {session &&
                      (session.user.id === comment.authorId ||
                        session.user.role === "ADMIN") && (
                        <IconButton
                          size="sm"
                          variant="plain"
                          color="danger"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <i className="fas fa-trash" />
                        </IconButton>
                      )}
                  </Box>
                  <Typography level="body-md" sx={{ mb: 2 }}>
                    {comment.content}
                  </Typography>
                  {session && (
                    <Button
                      size="sm"
                      variant="plain"
                      onClick={() =>
                        setReplyTo(replyTo === comment.id ? null : comment.id)
                      }
                    >
                      {replyTo === comment.id ? "Cancelar" : "Responder"}
                    </Button>
                  )}

                  {replyTo === comment.id && (
                    <Box sx={{ mt: 2, pl: 2, borderLeft: "2px solid var(--cv-neutral200)" }}>
                      <Textarea
                        placeholder="Escreva sua resposta..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        minRows={2}
                        maxRows={6}
                        sx={{ mb: 1 }}
                        disabled={createComment.isPending}
                      />
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="sm"
                          onClick={() => handleSubmitReply(comment.id)}
                          disabled={!replyContent.trim() || createComment.isPending}
                          loading={createComment.isPending}
                        >
                          Enviar
                        </Button>
                        <Button
                          size="sm"
                          variant="plain"
                          onClick={() => {
                            setReplyTo(null);
                            setReplyContent("");
                          }}
                        >
                          Cancelar
                        </Button>
                      </Stack>
                    </Box>
                  )}

                  {/* Render replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <Box sx={{ mt: 3, pl: 3, borderLeft: "2px solid var(--cv-neutral200)" }}>
                      <Stack spacing={2}>
                        {comment.replies.map((reply) => (
                          <Box key={reply.id}>
                            <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                              {reply.author.image ? (
                                <Box
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    position: "relative",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    flexShrink: 0,
                                  }}
                                >
                                  <Image
                                    src={reply.author.image}
                                    alt={reply.author.name ?? "User"}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    unoptimized
                                  />
                                </Box>
                              ) : (
                                <Box
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    bgcolor: "var(--cv-neutral200)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <Typography
                                    level="body-xs"
                                    sx={{ fontWeight: 700 }}
                                  >
                                    {(reply.author.name ?? "U")
                                      .charAt(0)
                                      .toUpperCase()}
                                  </Typography>
                                </Box>
                              )}
                              <Box sx={{ flex: 1 }}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box>
                                    <Typography
                                      level="body-sm"
                                      sx={{ fontWeight: 700 }}
                                    >
                                      {reply.author.name ?? "Usuário"}
                                    </Typography>
                                    <Typography
                                      level="body-xs"
                                      sx={{ color: "var(--cv-textMuted80)" }}
                                    >
                                      {formatDate(reply.createdAt)}
                                    </Typography>
                                  </Box>
                                  {session &&
                                    (session.user.id === reply.authorId ||
                                      session.user.role === "ADMIN") && (
                                      <IconButton
                                        size="sm"
                                        variant="plain"
                                        color="danger"
                                        onClick={() =>
                                          handleDeleteComment(reply.id)
                                        }
                                      >
                                        <i className="fas fa-trash" />
                                      </IconButton>
                                    )}
                                </Box>
                                <Typography level="body-sm" sx={{ mt: 0.5 }}>
                                  {reply.content}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Box>
              </Box>
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography level="body-sm" sx={{ color: "var(--cv-textMuted80)" }}>
          Nenhum comentário ainda. Seja o primeiro a comentar!
        </Typography>
      )}
    </Box>
  );
}
